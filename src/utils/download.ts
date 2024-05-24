import { fs, path, http } from '@tauri-apps/api' // invoke,
import { getInstancePath } from './versionManager'

// type download = (url: string, dest: string) => Promise<void>

type downloadMod = (
	url: string,
	instanceName: string,
	modName: string
) => Promise<void>

type downloadVersion = (url: string, instanceName: string) => Promise<void>

// export const download: download = async (url: string, dest: string) => {
// 	return invoke('download', { url, dest })
// }

export const downloadMod = async (
	url: string,
	instanceName: string,
	modName: string
) => {
	const contentpath = await getInstancePath(instanceName).then(v =>
		path.join(v, 'game/content')
	)

	if (!(await fs.exists(contentpath))) await fs.createDir(contentpath)

	return download(url, await path.join(contentpath, modName))
}

export const downloadVersion: downloadVersion = async (
	url: string,
	instanceName: string
) => {
	const instancePath = await getInstancePath(instanceName)
	await fs.createDir(await path.join(instancePath, 'game/content'), {
		recursive: true,
	})

	return download(url, await path.join(instancePath, 'game'))
}

export const download = async (
	url: string,
	dest: string,
	options?: http.RequestOptions
) => {
	console.log(url, dest)
	await fs.writeBinaryFile(
		dest,
		(
			await (
				await http.getClient()
			).get(url, {
				...(options || {}),
				responseType: http.ResponseType.Binary,
			})
		).data as fs.BinaryFileContents
	)
}
