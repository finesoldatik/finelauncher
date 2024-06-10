import axios from 'axios'
import util from './Util'

export const defaultRepos = [
	{
		name: 'VE',
    owner: 'MihailRis',
    repository: 'VoxelEngine-Cpp',
    buildCommands: {
      'linux': [
        'mkdir build',
        '@build cmake -DCMAKE_BUILD_TYPE=Release ..',
        '@build cmake --build .',
        "build/VoxelEngine",
      ],
      'win32': [
        'mkdir build',
        '@build cmake -DCMAKE_BUILD_TYPE=Release -DVOXELENGINE_BUILD_WINDOWS_VCPKG=ON ..',
        '@build cmake --build . --config Release',
        "build/VoxelEngine.exe",
      ]
    }
	},
	{
		name: 'RVE',
    owner: 'wampal',
    repository: 'RustyVoxelEngine',
	},
]

export interface IVersion {
	/** Release name */
	name: string
	filename: string
	/** Direct download link */
	url: string
	/** Repository id. Example: ve, rve */
	repository: string
}

export interface IAsset {
	/** Also known as filename */
	name: string
	/** Direct download link */
	browser_download_url: string
	/** Type of file. Example: application/zip */
	content_type: string
}

type platformCheckCallback = (asset: IAsset) => boolean

export default class VersionWrapper {
	repoUrls: { name: string; url: string }[]
	repositories: Map<
		string,
		{
			name: string
			assets: IAsset[]
		}[]
	>

	constructor(repoUrls: { name: string; owner: string, repository: string }[] = defaultRepos) {
		this.repoUrls = repoUrls
		this.repositories = new Map()
	}

	async getRepositories() {
		for (const repoUrl of this.repoUrls) {
			const response = await axios.get(`https://api.github.com/repos/${repoUrl.owner}/${repoUrl.repository}/releases`).catch(() => {})
			if (response) this.repositories.set(repoUrl.name, response.data.concat([
        {
          name: "Git",
          assets: [
            {
              name: "git",
              browser_download_url: `https://github.com/${repoUrl.owner}/${repoUrl.repository}.git`,
              content_type: "git"
            }
          ]
        }
      ]))
		}
		return this.repositories
	}

	private getPlatformVersions = (
		platformCheckCallback: platformCheckCallback
	) => {
		const versions: IVersion[] = []
		this.repositories.forEach((releases, repoid) => {
			releases.forEach(release => {
				release.assets.forEach(asset => {
					if (platformCheckCallback(asset)) {
						versions.push({
							name: release.name,
							filename: asset.name,
							url: asset.browser_download_url,
							repository: repoid,
						})
					}
				})
			})
		})
		console.log('versions:', versions)
		return versions
	}

	getWindowsVersions = () => this.getPlatformVersions(util.isWindows)
	getLinuxVersions = () => this.getPlatformVersions(util.isLinux)
}
