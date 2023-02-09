import {snakeToCamel, camelToSnake, camelCase } from './utility/stringUtility'
import { IIndexable } from '@/interfaces'
import {IModel} from "@/interfaces/IModel";
import Form from 'vform'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

class Model implements IModel{

	private _fillable: string[] = []
	private _presents: string[] = []
	private _ignore: string[] = []
	private _convert: boolean = true

	public converter: any
	private originalData: object = {}
	public arrayMapTarget: Array<any> = []
	public form = new Form

	constructor() {
		this.converter = {
			snakeToCamel: snakeToCamel,
			camelToSnake: camelToSnake
		}
	}

	get fillable(): string[] {
		return this._fillable
	}

	set fillable(val: string[]) {
		this._fillable = val
	}

	get presents(): string[] {
		return this._presents
	}

	set presents(val: string[]) {
		this._presents = val
	}

	get ignore() {
		return this._ignore
	}

	set ignore(val: string[]) {
		this._ignore = val
	}

	get convert(): boolean {
		return this._convert
	}

	set convert(val: boolean) {
		this._convert = val

		if(!val) {
			this.converter = {
				snakeToCamel: (p: string) => p,
				camelToSnake: (p: string) => p
			}
		}
	}

	get data(): IIndexable {
		return this.originalData
	}

	set data(val: IIndexable) {
		this.originalData = val

		if(val) {
			this.create()
		}
	}

	fill() {
		this.form = new Form(this.getPostable())
	}

	update(data: IIndexable): Model {
		this.data = data
		return this
	}

	create() {
		Object.entries(this.data).map(x => {
					x[0] = this.converter.camelToSnake(x[0])
					return x
		})
			.filter(x => {
				return this.hasOwnProperty(this.converter.snakeToCamel(x[0]))
			})
			.map(x => {
				const key: keyof IIndexable = this.converter.snakeToCamel(x[0])
				const data = this as IIndexable

				if(typeof data[key] == "number") {
					data[key] = Number(x[1])
					return
				}

				if(data[key] && data[key].getPostable instanceof Function) {
					data[key] = new data[key].constructor(x[1])
					return
				}

				data[key] = x[1]
			})

		  this.setRelations()
	}

	public beforePostable() {
	}

	public afterPostable(res: IIndexable) {
	}

	public joinWhere(x: IIndexable) {
		return this.presents.some(v => x[0] == v)
	}

	public ignoreWhere(x: IIndexable) {
		return this.ignore.every(v => x[0] != v)
	}

	public arrayMap(...mappable: Array<any>) {
		this.arrayMapTarget = mappable
	}

	public getPostable(): IIndexable {
		this.beforePostable()

		const res = Object.entries(this)
			.filter(x => this.fillable.some(v => v == x[0]))
			.filter(x => this.ignoreWhere(x))
			.filter(x => {
				if(this.ignoreWhere.length) {
					return true
				}
				return x[1] || this.joinWhere(x)
			})
			.map(x => {
				const v = {key: x[0], value: x[1]}
				const key = this.converter.camelToSnake(v.key)

				if (v.value && v.value.getPostable instanceof Function) {
					v.value = v.value.getPostable()
				}

				if (v.value instanceof Array && v.value[0]) {
					if (v.value[0].getPostable instanceof Function) {
						v.value = v.value.map(y => y.getPostable())
					}
				}

				return {[key]: v.value}
			})

		const v = this.mapToObject(res)
		this.afterPostable(v)

		return v
	}

	setRelations() {
		this.arrayMapTarget
			.filter(x => this.hasOwnProperty(x.bindKey))
			.map(x => {
				return {
					originalKey: x.bindKey, key: this.converter.camelToSnake(x.bindKey), value: x.model
				}
			})
			.filter(x => this.data[x.key])
			.map(x => {
				return (this as IIndexable)[x.originalKey] =
					Object.entries(this.data[x.key])
						.map(xs => {
							return new x.value((xs[1] as IIndexable))
						})
			})
	}

	mapToObject(map: Array<any>): IIndexable {
		const res: IIndexable = {}
		map.forEach(x => {
			res[Object.keys(x)[0]] = Object.values(x)[0]
		})
		return res
	}

	async post<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
		this.fill()
		return await this.form.post(url, config)
	}

	async patch<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
		this.fill()
		return await this.form.patch(url, config)
	}

	async delete<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
		this.fill()
		return await this.form.delete(url, config)
	}

	errors() {
		return this.form.errors
	}
}

export default Model
