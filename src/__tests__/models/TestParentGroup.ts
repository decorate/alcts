/**
 * テスト用の親グループモデル
 * @class TestParentGroup
 * @extends {Model}
 */
import Model from '@/Model'
import {Relation} from '@/Relation'
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
  user: Relation<TestUser> = new Relation(TestUser)

  constructor(data: object = {}) {
    super()
    this.fillable = ['id', 'name', 'user']
    this.data = data
  }

  /**
   * リレーションの定義
   */
  protected relations = {
    user: new Relation(TestUser),
  }
}
