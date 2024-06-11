import { IAsset } from '.'

const isCrossPlatform = (asset: IAsset) =>  asset.browser_download_url.endsWith('.git')

export default {
  isCrossPlatform,
	isWindows: (asset: IAsset) => /win[0-9]+/i.test(asset.name) || isCrossPlatform(asset),
	isLinux: (asset: IAsset) =>
		asset.content_type == 'application/vnd.appimage' ||
		asset.name.endsWith('.AppImage') || isCrossPlatform(asset),
}
