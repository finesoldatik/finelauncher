import axios from 'axios'
import util from './Util'

export const defaultRepos = [
  {
    name: 'Voxel Engine',
    icon: 've.png',
    owner: 'MihailRis',
    repository: 'VoxelEngine-Cpp',
    releases: [],
    buildCommands: {
      'linux': [
        'mkdir -p build',
        '@build cmake -DCMAKE_BUILD_TYPE=Release ..',
        '@build cmake --build .',
        "build/VoxelEngine",
      ],
      'win32': [
        '!mkdir build',
        '@build cmake -DCMAKE_BUILD_TYPE=Release -DVOXELENGINE_BUILD_WINDOWS_VCPKG=ON ..',
        '@build cmake --build . --config Release',
        "build/Release/VoxelEngine.exe",
      ]
    }
  },
  {
    name: 'Voxel Engine DEBRIS',
    icon: 'debris.jpg',
    owner: 'R0STUS',
    repository: 'Voxel-Engine_DEBRIS',
    releases: [],
    buildCommands: {
      'linux': [
        'mkdir -p build',
        '@build cmake -DCMAKE_BUILD_TYPE=Release ..',
        '@build cmake --build .',
        "build/VoxelEngine",
      ],
      'win32': [
        '!mkdir build',
        '@build cmake -DCMAKE_BUILD_TYPE=Release -DVOXELENGINE_BUILD_WINDOWS_VCPKG=ON ..',
        '@build cmake --build . --config Release',
        "build/Release/VoxelEngine.exe",
      ]
    }
  },
  {
    name: 'Rusty Voxel Engine',
    icon: 'rve.png',
    owner: 'wampal',
    repository: 'RustyVoxelEngine',
    releases: [],
    buildCommands: {
      'linux': [
        'cargo build --release',
        'target/release/voxel_engine',
      ],
      'win32': [
        'cargo build --release',
        'target/release/voxel_engine.exe',
      ]
    }
  },
]

export interface IAsset {
  /** Also known as filename */
  name: string
  /** Direct download link */
  browser_download_url: string
  /** Type of file. Example: application/zip */
  content_type: string
}

export interface IRepository {
  /** Repository name */
  name: string
  /** Repository icon name */
  icon: string
  /** Repository owner */
  owner: string
  /** GitHub repository name */
  repository: string
  /** Releases provided */
  releases: { name: string; assets: IAsset[] }[]
  /** Build commands to build from source */
  buildCommands: any,
}

export interface IVersion {
  /** Release name */
  name: string
  filename: string
  /** Direct download link */
  url: string
  /** Repository */
  repository: IRepository
  /** is it a git version */
  git: boolean
}

type platformCheckCallback = (asset: IAsset) => boolean

export default class VersionWrapper {
  repositories: IRepository[]

  constructor(repositories: IRepository[] = defaultRepos) {
    this.repositories = repositories
  }

  async updateRepositories() {
    for (const i in this.repositories) {
      const repository = this.repositories[i]
      const response = await axios.get(`https://api.github.com/repos/${repository.owner}/${repository.repository}/releases`).catch(() => {})
      if (response) this.repositories[i].releases = response.data.concat([
        {
          name: 'Git',
          assets: [
            {
              name: 'git',
              browser_download_url: `https://github.com/${repository.owner}/${repository.repository}.git`,
              content_type: 'git'
            }
          ]
        }
      ])
    }
  }

  private getPlatformVersions = (
    platformCheckCallback: platformCheckCallback
  ) => {
    const repositories: { name: string, versions: IVersion[] }[] = []
    this.repositories.forEach(repository => {
      const versions: IVersion[] = []
      repository.releases.forEach(release => {
        release.assets.forEach(asset => {
          if (platformCheckCallback(asset)) {
            versions.push({
              name: release.name,
              filename: asset.name,
              url: asset.browser_download_url,
              repository,
              git: asset.content_type == 'git',
            })
          }
        })
      })
      repositories.push({ name: repository.name, versions })
    })
    console.log('repositories:', repositories)
    return repositories
  }

  getWindowsVersions = () => this.getPlatformVersions(util.isWindows)
  getLinuxVersions = () => this.getPlatformVersions(util.isLinux)
}
