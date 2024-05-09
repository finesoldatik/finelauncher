import { Asset } from ".";

export default {
  isWindows: (asset: Asset) => /win[0-9]+/i.test(asset.name),
  isLinux: (asset: Asset) =>
    asset.content_type == "application/vnd.appimage" ||
    asset.name.endsWith(".AppImage")
};
