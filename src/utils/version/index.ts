import axios from "axios";
import util from "./Util";

export default class VersionWrapper {
  constructor(
    repoUrl = "https://api.github.com/repos/MihailRis/VoxelEngine-Cpp/releases"
  ) {
    this.url = repoUrl;
    this.releases = [];
  }

  async getReleases(url = this.url) {
    const response = await axios.get(url);
    this.releases = response.data;
  }

  getPlatformVersions = (platformCheckCallback = (asset) => {}) => {
    const versions = [{ name: "", filename: "", url: "" }];
    versions.length = 0;
    this.releases.forEach((release) => {
      release.assets.forEach((asset) => {
        if (platformCheckCallback(asset)) {
          versions.push({
            name: release.name,
            filename: asset.name,
            url: asset.browser_download_url,
          });
        }
      });
    });
    return versions;
  };

  getWindowsVersions = () => this.getPlatformVersions(util.isWindows);
  getLinuxVersions = () => this.getPlatformVersions(util.isLinux);
}
