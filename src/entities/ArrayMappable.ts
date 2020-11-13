import pluralize from 'pluralize'
import {camelCase} from '../utility/stringUtility'
import Model from "@/Model"

export class ArrayMappable<T extends Model> {

	bindKey: string = ''
	model: any

	constructor(model: new() => T) {
		this.bindKey = pluralize(camelCase(model.name))
		this.model = model
	}

	bind(key: string): ArrayMappable<T> {
		this.bindKey = key
		return this
	}
}