import {snakeToCamel, camelToSnake, camelCase} from './utility/stringUtility'
import {IIndexable} from '@/interfaces'
import {IModel} from '@/interfaces/IModel'
import {Relation} from './Relation'

class Model implements IModel {
  public _fillable: string[] = []
  public _presents: string[] = []
  public _ignore: string[] = []
  public _convert: boolean = true
  public _relations: Map<string, new (data?: any) => any> = new Map()
  public _initializeRelations?: () => void
  public _errors: {[key: string]: string[]} = {}

  public converter: any
  public originalData: object = {}
  public arrayMapTarget: Array<any> = []

  constructor() {
    this.converter = {
      snakeToCamel: snakeToCamel,
      camelToSnake: camelToSnake,
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

    if (!val) {
      this.converter = {
        snakeToCamel: (p: string) => p,
        camelToSnake: (p: string) => p,
      }
    }
  }

  get data(): IIndexable {
    return this.originalData
  }

  set data(val: IIndexable) {
    this.originalData = val

    if (val) {
      this.create()
    }
  }

  update(data: IIndexable): Model {
    this.data = data
    return this
  }

  create() {
    Object.entries(this.data)
      .map(x => {
        if (this.convert) {
          x[0] = this.converter.snakeToCamel(x[0])
        }
        return x
      })
      .filter(x => {
        return this.hasOwnProperty(x[0])
      })
      .map(x => {
        const key = x[0] as string
        const data = this as IIndexable

        const arrayMap = this.arrayMapTarget.find(m => {
          if (!this.convert) {
            const snakeBindKey = this.converter.camelToSnake(m.bindKey)
            return snakeBindKey === key
          }
          return m.bindKey === key
        })
        if (arrayMap) {
          if (!this.convert) {
            const snakeKey = this.converter.camelToSnake(key)
            if (this.data[snakeKey] && Array.isArray(this.data[snakeKey])) {
              data[key] = this.data[snakeKey].map((item: IIndexable) => {
                if (item instanceof arrayMap.model) {
                  return item
                }
                return new arrayMap.model(item)
              })
              return
            }
          }
          if (Array.isArray(x[1])) {
            data[key] = x[1].map(item => {
              if (item instanceof arrayMap.model) {
                return item
              }
              return new arrayMap.model(item)
            })
            return
          }
        }

        if (typeof data[key] == 'number') {
          data[key] = Number(x[1])
          return
        }

        if (data[key] instanceof Relation) {
          data[key].set(x[1])
          return
        }

        const relationClass = this._relations.get(key)
        if (relationClass && x[1]) {
          if (x[1] instanceof relationClass) {
            data[key] = x[1]
          } else {
            data[key] = new relationClass(x[1])
          }
          return
        }

        if (data[key] && data[key].getPostable instanceof Function) {
          data[key] = new data[key].constructor(x[1])
          return
        }

        if (!this.convert) {
          const snakeKey = this.converter.camelToSnake(key)
          if (this.data[snakeKey]) {
            data[key] = this.data[snakeKey]
            return
          }
        }

        data[key] = x[1]
      })

    if (this._initializeRelations) {
      this._initializeRelations()
    }

    this.setRelations()
  }

  public beforePostable() {}

  public afterPostable(res: IIndexable) {}

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
        if (this.ignoreWhere.length) {
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
          originalKey: x.bindKey,
          key: this.converter.camelToSnake(x.bindKey),
          value: x.model,
        }
      })
      .filter(x => this.data[x.key])
      .map(x => {
        return ((this as IIndexable)[x.originalKey] = Object.entries(
          this.data[x.key]
        ).map(xs => {
          return new x.value(xs[1] as IIndexable)
        }))
      })
  }

  mapToObject(map: Array<any>): IIndexable {
    const res: IIndexable = {}
    map.forEach(x => {
      Object.assign(res, x)
    })
    return res
  }

  get errors() {
    return this._errors
  }

  set errors(val: {[key: string]: string[]}) {
    this._errors = val
  }
}

export default Model
