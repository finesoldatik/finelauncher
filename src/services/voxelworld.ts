/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean
	/** request path */
	path: string
	/** content type of request body */
	type?: ContentType
	/** query params */
	query?: QueryParamsType
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseFormat
	/** request body */
	body?: unknown
	/** base url */
	baseUrl?: string
	/** request cancellation token */
	cancelToken?: CancelToken
}

export type RequestParams = Omit<
	FullRequestParams,
	'body' | 'method' | 'query' | 'path'
>

export interface ApiConfig<SecurityDataType = unknown> {
	baseUrl?: string
	baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
	securityWorker?: (
		securityData: SecurityDataType | null
	) => Promise<RequestParams | void> | RequestParams | void
	customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
	extends Response {
	data: D
	error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
	Json = 'application/json',
	FormData = 'multipart/form-data',
	UrlEncoded = 'application/x-www-form-urlencoded',
	Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
	public baseUrl: string = '/api/v1/'
	private securityData: SecurityDataType | null = null
	private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
	private abortControllers = new Map<CancelToken, AbortController>()
	private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
		fetch(...fetchParams)

	private baseApiParams: RequestParams = {
		credentials: 'same-origin',
		headers: {},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	}

	constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
		Object.assign(this, apiConfig)
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data
	}

	protected encodeQueryParam(key: string, value: any) {
		const encodedKey = encodeURIComponent(key)
		return `${encodedKey}=${encodeURIComponent(
			typeof value === 'number' ? value : `${value}`
		)}`
	}

	protected addQueryParam(query: QueryParamsType, key: string) {
		return this.encodeQueryParam(key, query[key])
	}

	protected addArrayQueryParam(query: QueryParamsType, key: string) {
		const value = query[key]
		return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
	}

	protected toQueryString(rawQuery?: QueryParamsType): string {
		const query = rawQuery || {}
		const keys = Object.keys(query).filter(
			key => 'undefined' !== typeof query[key]
		)
		return keys
			.map(key =>
				Array.isArray(query[key])
					? this.addArrayQueryParam(query, key)
					: this.addQueryParam(query, key)
			)
			.join('&')
	}

	protected addQueryParams(rawQuery?: QueryParamsType): string {
		const queryString = this.toQueryString(rawQuery)
		return queryString ? `?${queryString}` : ''
	}

	private contentFormatters: Record<ContentType, (input: any) => any> = {
		[ContentType.Json]: (input: any) =>
			input !== null && (typeof input === 'object' || typeof input === 'string')
				? JSON.stringify(input)
				: input,
		[ContentType.Text]: (input: any) =>
			input !== null && typeof input !== 'string'
				? JSON.stringify(input)
				: input,
		[ContentType.FormData]: (input: any) =>
			Object.keys(input || {}).reduce((formData, key) => {
				const property = input[key]
				formData.append(
					key,
					property instanceof Blob
						? property
						: typeof property === 'object' && property !== null
						? JSON.stringify(property)
						: `${property}`
				)
				return formData
			}, new FormData()),
		[ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
	}

	protected mergeRequestParams(
		params1: RequestParams,
		params2?: RequestParams
	): RequestParams {
		return {
			...this.baseApiParams,
			...params1,
			...(params2 || {}),
			headers: {
				...(this.baseApiParams.headers || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {}),
			},
		}
	}

	protected createAbortSignal = (
		cancelToken: CancelToken
	): AbortSignal | undefined => {
		if (this.abortControllers.has(cancelToken)) {
			const abortController = this.abortControllers.get(cancelToken)
			if (abortController) {
				return abortController.signal
			}
			return void 0
		}

		const abortController = new AbortController()
		this.abortControllers.set(cancelToken, abortController)
		return abortController.signal
	}

	public abortRequest = (cancelToken: CancelToken) => {
		const abortController = this.abortControllers.get(cancelToken)

		if (abortController) {
			abortController.abort()
			this.abortControllers.delete(cancelToken)
		}
	}

	public request = async <T = any, E = any>({
		body,
		secure,
		path,
		type,
		query,
		format,
		baseUrl,
		cancelToken,
		...params
	}: FullRequestParams): Promise<HttpResponse<T, E>> => {
		const secureParams =
			((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{}
		const requestParams = this.mergeRequestParams(params, secureParams)
		const queryString = query && this.toQueryString(query)
		const payloadFormatter = this.contentFormatters[type || ContentType.Json]
		const responseFormat = format || requestParams.format

		return this.customFetch(
			`${baseUrl || this.baseUrl || ''}${path}${
				queryString ? `?${queryString}` : ''
			}`,
			{
				...requestParams,
				headers: {
					...(requestParams.headers || {}),
					...(type && type !== ContentType.FormData
						? { 'Content-Type': type }
						: {}),
				},
				signal:
					(cancelToken
						? this.createAbortSignal(cancelToken)
						: requestParams.signal) || null,
				body:
					typeof body === 'undefined' || body === null
						? null
						: payloadFormatter(body),
			}
		).then(async response => {
			const r = response.clone() as HttpResponse<T, E>
			r.data = null as unknown as T
			r.error = null as unknown as E

			const data = !responseFormat
				? r
				: await response[responseFormat]()
						.then(data => {
							if (r.ok) {
								r.data = data
							} else {
								r.error = data
							}
							return r
						})
						.catch(e => {
							r.error = e
							return r
						})

			if (cancelToken) {
				this.abortControllers.delete(cancelToken)
			}

			if (!response.ok) throw data
			return data
		})
	}
}

/**
 * @title Voxel World API
 * @version 1.0.0
 * @baseUrl /api/v1/
 *
 * API для сайта VoxelWorld.
 */
export class Api<
	SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
	mods = {
		/**
		 * @description Возвращает список модов с возможностью фильтрации, сортировки и пагинации.
		 *
		 * @tags Mods
		 * @name GetMods
		 * @summary Получение списка модов
		 * @request GET:/mods
		 */
		getMods: (
			query?: {
				/**
				 * Фильтр по названию мода (поиск по строке)
				 * @maxLength 255
				 */
				title?: string
				/** Фильтр по тегам (список ID тегов) */
				'tag_id[]'?: number[]
				/**
				 * Номер страницы для пагинации
				 * @default 1
				 */
				page?: number
				/**
				 * Сортировка по определенным критериям
				 * @default 1
				 */
				sort?: 1 | 2 | 3 | 4
				/**
				 * Количество элементов на странице
				 * @default 10
				 */
				item_count?: number
				/**
				 * Порядок сортировки (asc или desc)
				 * @default "desc"
				 */
				sortOrder?: 'asc' | 'desc'
			},
			params: RequestParams = {}
		) =>
			this.request<
				{
					/** Уникальный идентификатор мода */
					id?: number
					/** Название мода */
					title?: string
					/** Описание мода */
					description?: string
					/** Количество загрузок мода */
					downloads?: number
					/** Количество лайков мода */
					likes?: number
					/**
					 * Дата последнего обновления версии мода (если существует)
					 * @format date-time
					 */
					lastUpdateDate?: string
					/** Автор мода */
					author?: {
						id?: number
						name?: string
						/** Аватар пользователя */
						avatar?: string | null
					}
					/** Список тегов мода */
					tags?: {
						id?: number
						title?: string
					}[]
					/**
					 * Путь к логотипу мода
					 * @example "/storage/path/to/logo.png"
					 */
					pathLogo?: string
				}[],
				void
			>({
				path: `/mods`,
				method: 'GET',
				query: query,
				format: 'json',
				...params,
			}),

		/**
		 * @description Возвращает детальную информацию о конкретном моде по его ID.
		 *
		 * @tags Mods
		 * @name GetModDetail
		 * @summary Получение детальной информации о моде
		 * @request GET:/mods/{id}
		 */
		getModDetail: (id: number, params: RequestParams = {}) =>
			this.request<
				{
					/** Уникальный идентификатор мода */
					id?: number
					/** Автор мода */
					author?: {
						id?: number
						name?: string
						/** Аватар пользователя */
						avatar?: string | null
					}
					/** Список соавторов мода */
					coauthors?: {
						id?: number
						name?: string
						/** Аватар пользователя */
						avatar?: string | null
					}[]
					/** Название мода */
					title?: string
					/** Описание мода */
					description?: string
					/** Количество загрузок мода */
					downloads?: number
					/** Количество лайков мода */
					likes?: number
					/** Флаг, указывает, лайкнут ли мод текущим пользователем */
					isLiked?: boolean
					/** Список тегов мода */
					tags?: {
						id?: number
						title?: string
					}[]
					/**
					 * Путь к логотипу мода
					 * @example "/storage/path/to/logo.png"
					 */
					pathLogo?: string
					/** Подробное описание мода (JSON-декодированные данные) */
					detail_description?: object
					/** Социальные ссылки мода (JSON-декодированные данные) */
					social_links?: object
				},
				void
			>({
				path: `/mods/${id}`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * @description Позволяет скачать файл версии мода по указанным ID.
		 *
		 * @tags Versions
		 * @name DownloadModVersion
		 * @summary Скачивание версии мода
		 * @request GET:/mods/{mod_id}/version/{version}/download
		 */
		downloadModVersion: (
			modId: number,
			version: string,
			params: RequestParams = {}
		) =>
			this.request<void, void>({
				path: `/mods/${modId}/version/${version}/download`,
				method: 'GET',
				...params,
			}),
	}
	tags = {
		/**
		 * @description Возвращает список всех доступных тегов для модов, миров или текстурных пакетов, в зависимости от типа.
		 *
		 * @tags Tags
		 * @name GetTags
		 * @summary Получение списка тегов
		 * @request GET:/tags
		 */
		getTags: (
			query: {
				/** Тип контента, для которого нужно получить теги. Возможные значения: 'mods', 'worlds', 'texturepacks'. */
				type: 'mods' | 'worlds' | 'texturepacks'
			},
			params: RequestParams = {}
		) =>
			this.request<
				{
					/** Уникальный идентификатор тега */
					id?: number
					/** Название тега */
					title?: string
				}[],
				void
			>({
				path: `/tags`,
				method: 'GET',
				query: query,
				format: 'json',
				...params,
			}),
	}
	texturepacks = {
		/**
		 * @description Возвращает список текстурпаков с возможностью фильтрации, сортировки и пагинации.
		 *
		 * @tags Texturepacks
		 * @name GetTexturepacks
		 * @summary Получение списка текстурпаков
		 * @request GET:/texturepacks
		 */
		getTexturepacks: (
			query?: {
				/**
				 * Фильтр по названию текстурпака (поиск по строке)
				 * @maxLength 255
				 */
				title?: string
				/** Фильтр по тегам (список ID тегов) */
				'tag_id[]'?: number[]
				/**
				 * Номер страницы для пагинации
				 * @default 1
				 */
				page?: number
				/**
				 * Сортировка по определенным критериям
				 * @default 1
				 */
				sort?: 1 | 2 | 3 | 4
				/**
				 * Количество элементов на странице
				 * @default 10
				 */
				item_count?: number
				/**
				 * Порядок сортировки (asc или desc)
				 * @default "desc"
				 */
				sortOrder?: 'asc' | 'desc'
			},
			params: RequestParams = {}
		) =>
			this.request<
				{
					/** Уникальный идентификатор текстурпака */
					id?: number
					/** Название текстурпака */
					title?: string
					/** Описание текстурпака */
					description?: string
					/** Количество загрузок текстурпака */
					downloads?: number
					/** Количество лайков текстурпака */
					likes?: number
					/**
					 * Дата последнего обновления версии текстурпака (если существует)
					 * @format date-time
					 */
					lastUpdateDate?: string
					/** Автор текстурпака */
					author?: {
						id?: number
						name?: string
						/** Аватар пользователя */
						avatar?: string | null
					}
					/** Список тегов текстурпака */
					tags?: {
						id?: number
						title?: string
					}[]
					/**
					 * Путь к логотипу текстурпака
					 * @example "/storage/path/to/logo.png"
					 */
					pathLogo?: string
				}[],
				void
			>({
				path: `/texturepacks`,
				method: 'GET',
				query: query,
				format: 'json',
				...params,
			}),

		/**
		 * @description Возвращает детальную информацию о конкретном текстурпаке по его ID.
		 *
		 * @tags Texturepacks
		 * @name GetTexturepackDetail
		 * @summary Получение детальной информации о текстурпаке
		 * @request GET:/texturepacks/{id}
		 */
		getTexturepackDetail: (id: number, params: RequestParams = {}) =>
			this.request<
				{
					/** Уникальный идентификатор текстурпака */
					id?: number
					/** Автор текстурпака */
					author?: {
						id?: number
						name?: string
						/** Аватар пользователя */
						avatar?: string | null
					}
					/** Список соавторов текстурпака */
					coauthors?: {
						id?: number
						name?: string
						/** Аватар пользователя */
						avatar?: string | null
					}[]
					/** Название текстурпака */
					title?: string
					/** Описание текстурпака */
					description?: string
					/** Количество загрузок текстурпака */
					downloads?: number
					/** Количество лайков текстурпака */
					likes?: number
					/** Флаг, указывает, лайкнут ли текстурпак текущим пользователем */
					isLiked?: boolean
					/** Список тегов текстурпака */
					tags?: {
						id?: number
						title?: string
					}[]
					/**
					 * Путь к логотипу текстурпака
					 * @example "/storage/path/to/logo.png"
					 */
					pathLogo?: string
					/** Подробное описание текстурпака (JSON-декодированные данные) */
					detail_description?: object
					/** Социальные ссылки текстурпака (JSON-декодированные данные) */
					social_links?: object
				},
				void
			>({
				path: `/texturepacks/${id}`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * @description Позволяет скачать файл версии текстурного пака по указанным ID.
		 *
		 * @tags Versions
		 * @name DownloadTexturepackVersion
		 * @summary Скачивание версии текстурного пака
		 * @request GET:/texturepacks/{texturepack_id}/version/{version}/download
		 */
		downloadTexturepackVersion: (
			texturepackId: number,
			version: string,
			params: RequestParams = {}
		) =>
			this.request<void, void>({
				path: `/texturepacks/${texturepackId}/version/${version}/download`,
				method: 'GET',
				...params,
			}),
	}
	versions = {
		/**
		 * @description Возвращает список версий для модов, миров или текстурных пакетов с возможностью пагинации, сортировки и фильтрации по типу контента.
		 *
		 * @tags Versions
		 * @name GetVersions
		 * @summary Получение списка версий
		 * @request GET:/versions/{id}
		 */
		getVersions: (
			id: number,
			query: {
				/** Тип контента, для которого нужно получить версии. Возможные значения: 'mods', 'worlds', 'texturepacks'. */
				type: 'mods' | 'worlds' | 'texturepacks'
				/**
				 * Номер страницы для пагинации (по умолчанию 1).
				 * @default 1
				 */
				page?: number
				/**
				 * Количество элементов на странице (по умолчанию 10).
				 * @default 10
				 */
				item_count?: number
				/**
				 * Порядок сортировки: 'asc' или 'desc' (по умолчанию 'asc').
				 * @default "asc"
				 */
				sortOrder?: 'asc' | 'desc'
			},
			params: RequestParams = {}
		) =>
			this.request<
				{
					/** Уникальный идентификатор версии */
					id?: number
					/** Статус версии */
					status?: {
						/** Идентификатор статуса */
						id?: number
						/** Название статуса */
						title?: string
					}
					/** Номер версии */
					version_number?: string
					/** Путь к файлу версии */
					path?: string
					/** Описание изменений */
					changelog?: string
					/** Список версий движка */
					engine?: {
						/** Идентификатор версии движка */
						id?: number
						/** Номер версии движка */
						version_number?: string
					}[]
					/**
					 * Дата создания версии
					 * @format date-time
					 */
					created_at?: string
				}[],
				void
			>({
				path: `/versions/${id}`,
				method: 'GET',
				query: query,
				format: 'json',
				...params,
			}),

		/**
		 * @description Возвращает детальную информацию о версии для заданного проекта и версии, включая статус, номер версии, изменения, зависимости и информацию о движке.
		 *
		 * @tags Versions
		 * @name GetVersionDetail
		 * @summary Получение детальной информации о версии
		 * @request GET:/versions/{project_id}/{version_id}
		 */
		getVersionDetail: (
			projectId: number,
			versionId: number,
			query: {
				/** Тип контента, для которого нужно получить версии. Возможные значения: 'mods', 'worlds', 'texturepacks'. */
				type: 'mods' | 'worlds' | 'texturepacks'
			},
			params: RequestParams = {}
		) =>
			this.request<
				{
					/** Уникальный идентификатор версии */
					id?: number
					/** Статус версии */
					status?: {
						/** Идентификатор статуса */
						id?: number
						/** Название статуса */
						title?: string
					}
					/** Номер версии */
					version_number?: string
					/** Путь к файлу версии */
					path?: string
					/** Описание изменений */
					changelog?: string
					/** Подробное описание изменений в формате JSON */
					detail_changelog?: object
					/** Зависимости версии в формате JSON */
					dependencies?: object
					/** Список версий движка */
					engine?: {
						/** Идентификатор версии движка */
						id?: number
						/** Номер версии движка */
						version_number?: string
					}[]
					/**
					 * Дата создания версии
					 * @format date-time
					 */
					created_at?: string
				},
				void
			>({
				path: `/versions/${projectId}/${versionId}`,
				method: 'GET',
				query: query,
				format: 'json',
				...params,
			}),
	}
	worlds = {
		/**
		 * @description Позволяет скачать файл версии мира по указанным ID.
		 *
		 * @tags Versions
		 * @name DownloadWorldVersion
		 * @summary Скачивание версии мира
		 * @request GET:/worlds/{world_id}/version/{version}/download
		 */
		downloadWorldVersion: (
			worldId: number,
			version: string,
			params: RequestParams = {}
		) =>
			this.request<void, void>({
				path: `/worlds/${worldId}/version/${version}/download`,
				method: 'GET',
				...params,
			}),

		/**
		 * @description Возвращает список миров с возможностью фильтрации, сортировки и пагинации.
		 *
		 * @tags Worlds
		 * @name GetWorlds
		 * @summary Получение списка миров
		 * @request GET:/worlds
		 */
		getWorlds: (
			query?: {
				/**
				 * Фильтр по названию мира (поиск по строке)
				 * @maxLength 255
				 */
				title?: string
				/** Фильтр по тегам (список ID тегов) */
				'tag_id[]'?: number[]
				/**
				 * Номер страницы для пагинации
				 * @default 1
				 */
				page?: number
				/**
				 * Сортировка по определенным критериям
				 * @default 1
				 */
				sort?: 1 | 2 | 3 | 4
				/**
				 * Количество элементов на странице
				 * @default 10
				 */
				item_count?: number
				/**
				 * Порядок сортировки (asc или desc)
				 * @default "desc"
				 */
				sortOrder?: 'asc' | 'desc'
			},
			params: RequestParams = {}
		) =>
			this.request<
				{
					/** Уникальный идентификатор мира */
					id?: number
					/** Название мира */
					title?: string
					/** Описание мира */
					description?: string
					/** Количество загрузок мира */
					downloads?: number
					/** Количество лайков мира */
					likes?: number
					/**
					 * Дата последнего обновления версии мира (если существует)
					 * @format date-time
					 */
					lastUpdateDate?: string
					/** Автор мира */
					author?: {
						id?: number
						name?: string
						/** Аватар пользователя */
						avatar?: string | null
					}
					/** Список тегов мира */
					tags?: {
						id?: number
						title?: string
					}[]
					/**
					 * Путь к логотипу мира
					 * @example "/storage/path/to/logo.png"
					 */
					pathLogo?: string
				}[],
				void
			>({
				path: `/worlds`,
				method: 'GET',
				query: query,
				format: 'json',
				...params,
			}),

		/**
		 * @description Возвращает детальную информацию о конкретном мире по его ID.
		 *
		 * @tags Worlds
		 * @name GetWorldDetail
		 * @summary Получение детальной информации о мире
		 * @request GET:/worlds/{id}
		 */
		getWorldDetail: (id: number, params: RequestParams = {}) =>
			this.request<
				{
					/** Уникальный идентификатор мира */
					id?: number
					/** Автор мира */
					author?: {
						id?: number
						name?: string
						/** Аватар пользователя */
						avatar?: string | null
					}
					/** Список соавторов мира */
					coauthors?: {
						id?: number
						name?: string
						/** Аватар пользователя */
						avatar?: string | null
					}[]
					/** Название мира */
					title?: string
					/** Описание мира */
					description?: string
					/** Количество загрузок мира */
					downloads?: number
					/** Количество лайков мира */
					likes?: number
					/** Флаг, указывает, лайкнут ли мир текущим пользователем */
					isLiked?: boolean
					/** Список тегов мира */
					tags?: {
						id?: number
						title?: string
					}[]
					/**
					 * Путь к логотипу мира
					 * @example "/storage/path/to/logo.png"
					 */
					pathLogo?: string
					/** Подробное описание мира (JSON-декодированные данные) */
					detail_description?: object
					/** Социальные ссылки мира (JSON-декодированные данные) */
					social_links?: object
				},
				void
			>({
				path: `/worlds/${id}`,
				method: 'GET',
				format: 'json',
				...params,
			}),
	}
}
