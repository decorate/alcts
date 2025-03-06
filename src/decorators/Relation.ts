/**
 * 関連モデルを定義するためのデコレータ
 * @param {any} modelClass 関連するモデルクラス
 * @param {string} [propertyName] プロパティ名（オプション）
 * @returns {PropertyDecorator} プロパティデコレータ
 */
export function Relation(
  modelClass: any,
  propertyName?: string
): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    const key = propertyName || propertyKey.toString()
    const model = target.constructor

    // モデルにリレーション情報を保存
    if (!model._relations) {
      model._relations = new Map()
    }
    model._relations.set(key, modelClass)

    // プライベートプロパティの初期化
    if (!target[`_${key}`]) {
      target[`_${key}`] = new modelClass()
    }

    // プロパティの定義
    Object.defineProperty(target, key, {
      get: function(this: any) {
        return this[`_${key}`]
      },
      set: function(this: any, value: any) {
        if (value instanceof modelClass) {
          this[`_${key}`] = value
        } else if (value && typeof value === 'object') {
          this[`_${key}`] = new modelClass(value)
        } else {
          this[`_${key}`] = new modelClass()
        }
      },
      enumerable: true,
      configurable: true,
    })

    // プロトタイプチェーンに初期化メソッドを追加
    if (!model.prototype._initializeRelations) {
      model.prototype._initializeRelations = function(this: any) {
        // すべてのリレーションを初期化
        this._relations.forEach((relationClass: any, relationKey: string) => {
          if (this[`_${relationKey}`] === undefined) {
            this[`_${relationKey}`] = new relationClass()
          }
        })
      }
    }
  }
}
