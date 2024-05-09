export default {
  isWindows: (asset) => /win[0-9]+/i.test(asset.name),
  isLinux: (asset) => asset.content_type == "application/vnd.appimage",
};
