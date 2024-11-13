interface Theme {
	primary: string
	secondary: string
	accent: string
	neutral: string
	base100: string
	base200: string
	base300: string
	baseContent: string
	info: string
	success: string
	warning: string
	error: string
}

// Функция для добавления тем в документ
export const addThemeStyles = () => {
	const style = document.createElement('style')
	style.innerHTML = `
    /* Определяем стили для темы 'myCustomTheme' */
    [data-theme="myCustomTheme"] {
      color-scheme: dark;
      --in: 72.06% 0.191 231.6;
      --su: 64.8% 0.150 160;
      --wa: 84.71% 0.199 83.87;
      --er: 71.76% 0.221 22.18;
      --pc: 13.138% 0.0392 275.75;
      --sc: 14.96% 0.052 342.55;
      --ac: 14.902% 0.0334 183.61;
      --inc: 0% 0 0;
      --suc: 0% 0 0;
      --wac: 0% 0 0;
      --erc: 0% 0 0;
      --rounded-box: 1rem;
      --rounded-btn: 0.5rem;
      --rounded-badge: 1.9rem;
      --animation-btn: 0.25s;
      --animation-input: .2s;
      --btn-focus-scale: 0.95;
      --border-btn: 1px;
      --tab-border: 1px;
      --tab-radius: 0.5rem;
      --p: 65.69% 0.196 275.75;
      --s: 74.8% 0.26 342.55;
      --a: 74.51% 0.167 183.61;
      --n: 31.3815% 0.021108 254.139175;
      --nc: 74.6477% 0.0216 264.435964;
      --b1: 25.3267% 0.015896 252.417568;
      --b2: 23.2607% 0.013807 253.100675;
      --b3: 21.1484% 0.01165 254.087939;
      --bc: 74.6477% 0.0216 264.435964;
    }
  `
	document.head.appendChild(style)
}

export const applyTheme = (themeName: string) => {
	document.body.style.setProperty('--p', '23%, 0.01, 336.0')

	document.body.setAttribute('data-theme', `custom__${themeName}`) // Устанавливаем имя темы
}
