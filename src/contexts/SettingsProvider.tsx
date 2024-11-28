import React, {
	createContext,
	useReducer,
	useContext,
	useEffect,
	useMemo,
	ReactNode,
	useRef,
} from 'react'
import { getValue, setValue } from '../services/localStorage'
import TranslatableText from '../services/translatableText'

interface SettingsState {
	theme: string
	translation: TranslatableText
	currentTab: number
	currentPage: string
	background: string
	hideLauncherOnLaunchGame: boolean
	fallingSnowflakes: boolean
	snowflakeCount: number
}

const initialState: SettingsState = {
	theme: getValue('theme') || 'dark',
	translation: new TranslatableText(),
	currentTab: getValue('currentTab') || 0,
	currentPage: getValue('currentPage') || '/',
	background: getValue('background') || 'day_1',
	hideLauncherOnLaunchGame: getValue('hideLauncherOnLaunchGame') || false,
	fallingSnowflakes: getValue('fallingSnowflakes') || false,
	snowflakeCount: getValue('snowflakeCount') || 300,
}

type SettingsAction =
	| { type: 'SET_THEME'; payload: string }
	| { type: 'SET_TRANSLATION'; payload: TranslatableText }
	| { type: 'SET_TAB'; payload: number }
	| { type: 'SET_PAGE'; payload: string }
	| { type: 'SET_BACKGROUND'; payload: string }
	| { type: 'SET_HIDE_LAUNCHER'; payload: boolean }
	| { type: 'SET_FALLING_SNOWFLAKES'; payload: boolean }
	| { type: 'SET_SNOWFLAKE_COUNT'; payload: number }
	| { type: 'RESET_SETTINGS' }

function settingsReducer(
	state: SettingsState,
	action: SettingsAction
): SettingsState {
	switch (action.type) {
		case 'SET_THEME':
			return { ...state, theme: action.payload }
		case 'SET_TRANSLATION':
			return { ...state, translation: action.payload }
		case 'SET_TAB':
			return { ...state, currentTab: action.payload }
		case 'SET_PAGE':
			return { ...state, currentPage: action.payload }
		case 'SET_BACKGROUND':
			return { ...state, background: action.payload }
		case 'SET_HIDE_LAUNCHER':
			return { ...state, hideLauncherOnLaunchGame: action.payload }
		case 'SET_FALLING_SNOWFLAKES':
			return { ...state, fallingSnowflakes: action.payload }
		case 'SET_SNOWFLAKE_COUNT':
			return { ...state, snowflakeCount: action.payload }
		case 'RESET_SETTINGS':
			return initialState
		default:
			return state
	}
}

export const SettingsContext = createContext<{
	state: SettingsState
	dispatch: React.Dispatch<SettingsAction>
}>({
	state: initialState,
	dispatch: () => {},
})

export const useSettingsContext = () => useContext(SettingsContext)

export default function SettingsProvider({
	children,
}: {
	children: ReactNode
}) {
	const [state, dispatch] = useReducer(settingsReducer, initialState)

	// Предыдущее состояние
	const prevState = useRef<SettingsState>(initialState)

	useEffect(() => {
		Object.keys(initialState).forEach(key => {
			const typedKey = key as keyof SettingsState
			if (!getValue(key)) {
				// Установка значений, которых нет в localStorage
				if (key !== 'translation') {
					setValue(key, initialState[typedKey])
				}
			}
		})
	}, [])

	// Обновление только изменившихся значений
	useEffect(() => {
		Object.keys(state).forEach(key => {
			const typedKey = key as keyof SettingsState
			if (state[typedKey] !== prevState.current[typedKey]) {
				if (key !== 'translation') {
					// Все кроме translation, потому что он у себя в классе обновляется
					setValue(key, state[typedKey])
				}
			}
		})

		// Обновление предыдущего состояния
		prevState.current = state
	}, [state])

	// Обновление темы
	useEffect(() => {
		document.body.setAttribute('data-theme', state.theme)
	}, [state.theme])

	// Мемоизация значения контекста
	const value = useMemo(
		() => ({
			state,
			dispatch,
		}),
		[state]
	)

	return (
		<SettingsContext.Provider value={value}>
			{children}
		</SettingsContext.Provider>
	)
}
