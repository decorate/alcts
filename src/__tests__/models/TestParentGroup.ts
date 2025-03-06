/**
 * テスト用の親グループモデル
 * @class TestParentGroup
 * @extends {Model}
 */
import Model from '../../Model'
import {Relation} from '../../Relation'
import {TestUser} from './TestUser'

export class TestParentGroup extends Model {
  /**
   * グループのID
   */
  id: number = 0

  /**
   * グループの名前
   */
  name: string = ''

  /**
   * グループのユーザー
   */
  users: TestUser[] = []

  constructor(data: object = {}) {
    super()
    this.fillable = ['id', 'name', 'users']

    if (Object.keys(data).length > 0) {
      this.data = data
    }
  }

  /**
   * リレーションの定義
   */
  protected relations = {
    user: new Relation(TestUser),
  }
}
