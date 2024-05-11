import axios from "axios";
import util from "./Util";

export type Asset = {
  /** Also known as filename */
  name: string;
  /** Direct download link */
  browser_download_url: string;
  /** Type of file. Example: application/zip */
  content_type: string;
};

type platformCheckCallback = (asset: Asset) => boolean;

const defaultRepos = [
  {
    name: "VE",
    url: "https://api.github.com/repos/MihailRis/VoxelEngine-Cpp/releases"
  },
  {
    name: "RVE",
    url: "https://api.github.com/repos/wampal/RustyVoxelEngine/releases"
  }
];

export type Version = {
  /** Release name */
  name: string;
  filename: string;
  /** Direct download link */
  url: string;
  /** Repository id. Example: ve, rve */
  repository: string;
};

export default class VersionWrapper {
  repoUrls: { name: string; url: string }[];
  repositories: Map<
    string,
    {
      name: string;
      assets: Asset[];
    }[]
  >;

  constructor(repoUrls: { name: string; url: string }[] = defaultRepos) {
    this.repoUrls = repoUrls;
    this.repositories = new Map();
  }

  async getRepositories() {
    for (let repoUrl of this.repoUrls) {
      const response = await axios.get(repoUrl.url);
      this.repositories.set(repoUrl.name, response.data);
    }
    return this.repositories;
  }

  private getPlatformVersions = (
    platformCheckCallback: platformCheckCallback
  ) => {
    const versions: Version[] = [];
    this.repositories.forEach((releases, repoid) => {
      releases.forEach((release) => {
        release.assets.forEach((asset) => {
          if (platformCheckCallback(asset)) {
            versions.push({
              name: release.name,
              filename: asset.name,
              url: asset.browser_download_url,
              repository: repoid
            });
          }
        });
      });
    });
    console.log("versions:", versions);
    return versions;
  };

  getWindowsVersions = () => this.getPlatformVersions(util.isWindows);
  getLinuxVersions = () => this.getPlatformVersions(util.isLinux);
}
