import { fs, path, invoke, os, shell } from '@tauri-apps/api' // http,
import {
	InstanceData,
	getInstancePath,
	saveInstanceData,
} from './instanceManager'
import { saveMods } from './mod'

export const download = async (
	url: string,
	dest: string,
	out_filename: string
) => {
	return invoke('download_file', { url, dest, out_filename })
}

export const downloadMod = async (
	url: string,
	instanceName: string,
	modId: number
) => {
	const contentPath = await getInstancePath(instanceName).then(v =>
		path.join(v, 'game/content/')
	)

	const modPath = await path.join(contentPath, 'temp_dir')

	if (!(await fs.exists(modPath))) {
		await fs.createDir(modPath)
		return download(url, modPath, 'mod.zip').then(() => {
			saveMods(modPath, contentPath, instanceName, modId)
		})
	} else
		deleteDir(await path.join(modPath)).then(async () => {
			await fs.createDir(modPath)

			return download(url, modPath, 'mod.zip').then(() => {
				saveMods(modPath, contentPath, instanceName, modId)
			})
		})
}

export const downloadVersion = async (
  version: IVersion,
	instanceName: string,
) => {
  version.repository.assets = null

	const instancePath = await getInstancePath(instanceName)
  if (!version.git) {
    await fs.createDir(await path.join(instancePath, 'game/content'), {
      recursive: true,
    })
  }


	const platform = await os.platform()
	let outFileName: string
  if (version.git) outFileName = 'game'
  else if (platform !== 'win32') outFileName = 'version.AppImage'
	else outFileName = 'version.zip'

	const icon = `/img/instance/${version.repository?.name.toLowerCase()}.png`
	let instanceData = {
		name: instanceName,
    version,
		icon,
		runParameters: '',
		platform,
		options: null,
	}

  if (version.git) {
    instanceData.platform = null
		return new shell.Command('git', ['clone', version.url, await path.join(instancePath, 'game')]).execute().then(
      () => {
        path.join(instancePath, 'game/content')
          .then(contentPath => fs.createDir(contentPath, { recursive: true }))
          .then(() => saveInstanceData(instanceName, instanceData))
      }
    )
  } else {
    return download(version.url, await path.join(instancePath, 'game'), outFileName).then(
      () => saveInstanceData(instanceName, instanceData)
    )
  }
}

export const deleteDir = async (path: string) => {
	return fs.removeDir(path, { recursive: true })
}

export const deleteMod = async (version: string, mod: string) => {
	return deleteDir(
		await path.join(await getInstancePath(version), 'game/content', mod)
	)
}

export const deleteInstance = async (version: string) => {
	return deleteDir(await getInstancePath(version))
}
