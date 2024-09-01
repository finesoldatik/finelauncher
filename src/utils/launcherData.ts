import axios from 'axios'

const baseUrl =
	'https://raw.githubusercontent.com/finesoldatik/finelauncher-data/main'

export async function getNews(): Promise<JSON> {
	return (await axios.get(`${baseUrl}/news.json`)).data
}

export async function getSupportedRepos(): Promise<JSON> {
	return (await axios.get(`${baseUrl}/supportedRepos.json`)).data
}
