import axios from 'axios'

export interface IContributor {
	avatar_url: string
	contributions: number
	events_url: string
	followers_url: string
	following_url: string
	gists_url: string
	gravatar_id: string
	html_url: string
	id: number
	login: string
	node_id: string
	organizations_url: string
	received_events_url: string
	repos_url: string
	site_admin: boolean
	starred_url: string
	subscriptions_url: string
	type: string
	url: string
}

const defaultUrl: string =
	'https://api.github.com/repos/finesoldatik/finelauncher/contributors?anon=1'

export default class ContributorsWrapper {
	url: string

	constructor(url: string = defaultUrl) {
		this.url = url
	}

	async getContributors() {
		return (await axios.get(this.url)).data as IContributor[]
	}
}
