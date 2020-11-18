import { Dictionary } from '@/interfaces/Dictionary'

export interface IRoute {
	path: string
	name?: string
	query: Dictionary<string>
	params: Dictionary<string>
	fullPath: string
}