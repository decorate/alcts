/**
 * リレーションを管理するためのユーティリティクラス
 * @class Relation
 * @template T リレーションの型
 */
export class Relation<T> {
  private value: T | null = null
  private modelClass: new (data?: any) => T

  /**
   * コンストラクタ
   * @param {new (data?: any) => T} modelClass モデルクラス
   */
  constructor(modelClass: new (data?: any) => T) {
    this.modelClass = modelClass
  }

  /**
   * リレーションの値を取得
   * @returns {T} リレーションの値
   */
  get(): T {
    if (this.value === null) {
      this.value = new this.modelClass()
    }
    return this.value
  }

  /**
   * リレーションの値を設定
   * @param {T | any} value 設定する値
   */
  set(value: T | any) {
    if (value instanceof this.modelClass) {
      this.value = value
    } else if (value && typeof value === 'object') {
      this.value = new this.modelClass(value)
    } else {
      this.value = new this.modelClass()
    }
  }
}
