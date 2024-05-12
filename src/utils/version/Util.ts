import { IAsset } from '.'

export default {
	isWindows: (asset: IAsset) => /win[0-9]+/i.test(asset.name),
	isLinux: (asset: IAsset) =>
		asset.content_type == 'application/vnd.appimage' ||
		asset.name.endsWith('.AppImage'),
}
