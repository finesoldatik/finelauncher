import axios from 'axios'
import {
	ModDetailResponse,
	ModsParams,
	ModsResponse,
	TagParams,
	TagResponse,
	TexturepackDetailResponse,
	TexturepacksParams,
	TexturepacksResponse,
	VersionDetailParams,
	VersionDetailResponse,
	VersionsParams,
	VersionsResponse,
	WorldDetailResponse,
	WorldsParams,
	WorldsResponse,
} from './voxelworld.interface'
import { APIVersion } from './voxelworld.type'

const baseUrl: string = 'https://voxelworld.ru/api'

// Mods

export async function getMods(
	version: APIVersion = 'v1',
	config?: ModsParams
): Promise<ModsResponse> {
	return (await axios.get(`${baseUrl}/${version}/mods`, config)).data
}

// Mod

export async function getMod(
	version: APIVersion = 'v1',
	id: number
): Promise<ModDetailResponse> {
	return (await axios.get(`${baseUrl}/${version}/mods/${id}`)).data
}

// Tags

export async function getTags(
	version: APIVersion = 'v1',
	config?: TagParams
): Promise<TagResponse> {
	return (await axios.get(`${baseUrl}/${version}/tags`, config)).data
}

export async function getTexturepacks(
	version: APIVersion = 'v1',
	config?: TexturepacksParams
): Promise<TexturepacksResponse> {
	return (await axios.get(`${baseUrl}/${version}/texturepacks`, config)).data
}

export async function getTexturepack(
	version: APIVersion = 'v1',
	id: number
): Promise<TexturepackDetailResponse> {
	return (await axios.get(`${baseUrl}/${version}/texturepacks/${id}`)).data
}

export async function getWorlds(
	version: APIVersion = 'v1',
	config?: WorldsParams
): Promise<WorldsResponse> {
	return (await axios.get(`${baseUrl}/${version}/worlds`, config)).data
}

export async function getWorld(
	version: APIVersion = 'v1',
	id: number
): Promise<WorldDetailResponse> {
	return (await axios.get(`${baseUrl}/${version}/worlds/${id}`)).data
}

export async function getVersions(
	version: APIVersion = 'v1',
	id: number,
	config: VersionsParams
): Promise<VersionsResponse> {
	return (await axios.get(`${baseUrl}/${version}/versions/${id}`, config)).data
}

export async function getVersion(
	version: APIVersion = 'v1',
	project_id: number,
	version_id: number,
	config?: VersionDetailParams
): Promise<VersionDetailResponse> {
	return (
		await axios.get(
			`${baseUrl}/${version}/versions/${project_id}/${version_id}`,
			config
		)
	).data
}
