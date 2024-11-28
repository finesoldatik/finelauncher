import { Asset } from '.'

const isCrossPlatform = (asset: Asset) =>
	asset.browser_download_url.endsWith('.git')

export default {
	isCrossPlatform,
	isWindows: (asset: Asset) =>
		/win[0-9]+/i.test(asset.name) || isCrossPlatform(asset),
	isLinux: (asset: Asset) =>
		asset.content_type == 'application/vnd.appimage' ||
		asset.name.endsWith('.AppImage') ||
		isCrossPlatform(asset),
}
