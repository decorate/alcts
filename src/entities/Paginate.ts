import {IIndexable} from "@/interfaces/IIndexxable"
import Model from "@/Model";
import { buildQuery, camelToSnake, snakeToCamel } from '@/utility/stringUtility'
import { IModel } from '@/interfaces/IModel'
import { IRouteWrapper } from '@/interfaces/IRouteWrapper'
import { Dictionary } from '@/interfaces/Dictionary'
import { RouteWrapper } from '@/entities/RouteWrapper'

let LIMIT = 10

export type PaginateConfig = {
	routerWrapper: IRouteWrapper,
	getApi: Function,
}

type PrevOrNext = {
	path: string,
	num: number,
	disabled: boolean
}

export class Paginate{

	originalData: IIndexable = {}
	currentPage = 0
	from = 0
	lastPage = 0
	lastPageUrl = ''
	nextPageUrl = ''
	path = ''
	perPage = 0
	prevPageUrl = ''
	to = 0
	total = 0
	data = []
	model?: {new(data: IIndexable): Model}
	config: PaginateConfig

	constructor(config: PaginateConfig) {
		this.config = config
	}

	static generate(config: PaginateConfig): Paginate {
		return new Paginate(config)
	}

	get limit () {
		if (this.lastPage < LIMIT) {
			return this.lastPage
		}
		return LIMIT
	}

	get hasPrev (): string {
		if(this.prevPageUrl) {
			const m = this.prevPageUrl.match(/api.*/)
			if(m) {
				return '/' + m[0]
			}
		}
		return this.prevPageUrl
	}

	get prev (): PrevOrNext {
		const num = this.getPage() - 1
		return {
			path: this.getPath(num),
			num: num,
			disabled: !this.hasPrev
		}
	}

	get hasNext (): string {
		if(this.nextPageUrl) {
			const m = this.nextPageUrl.match(/api.*/)
			if(m) {
				return '/' + m[0]
			}
		}
		return this.nextPageUrl
	}

	get next (): PrevOrNext {
		const num = this.getPage() + 1
		return {
			path: this.getPath(num),
			num: num,
			disabled: !this.hasNext
		}
	}

	create(source?: IIndexable) {
		if(source) {
			this.originalData = source
		}

		Object.entries(this.originalData)
		.map(x => {
			const d = {key: x[0], value: x[1]}
			d.key = camelToSnake(d.key)
			return d
		})
		.filter(x => this.hasOwnProperty(snakeToCamel(x.key)))
		.map(x => {
			const key = snakeToCamel(x.key)
			const self = this as IIndexable

			if(typeof self[key] == 'number') {
				self[key] = Number(x.value)
				return
			}

			if(key == 'data' && this.model) {
				self[key] = Object.entries(x.value)
					.map(v => {
						const data = v[1] as IIndexable
						return new this.model!(data)
					})
				return
			}

			self[key] = x.value
			return x
		})

		return this
	}

	setModel<T extends Model>(model: {new(data: IIndexable): T}): Paginate {
		this.model = model
		return this
	}

	getPath(num: number): string {
		const query = Object.assign({}, this.config.routerWrapper.route.query)
		query.page = num.toString()
		return `${this.path}?${buildQuery(query)}`
	}

	getFrom (): number {
		let from = 1
		const check = Math.floor(this.limit / 2)
		const page = this.getPage()
		if (this.currentPage > check) {
			from = this.currentPage - check
		}

		if (this.lastPage < page + check) {
			from = this.lastPage - (this.limit - 1)
		}

		return from
	}

	getPage (): number {
		let page = this.config.routerWrapper.route.query.page || 1
		return Number(page)
	}

	async nextUpdate(key?: string, query?: Dictionary<string | number | boolean>) {
		let url = this.hasNext
		if(query) {
			const q = buildQuery(query)
			url = `${url}&${q}`
		}
		const { data } = await this.config.getApi(url)
		const d = this.data
		this.create(key ? data[key] : data)
		d.push(...this.data)
		this.data = d
	}

	setLimit (num: number): Paginate {
		LIMIT = num
		return this
	}

}
