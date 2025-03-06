/**
 * テスト用の親グループモデル
 * @class TestParentGroup
 * @extends {Model}
 */
import Model from '@/Model'
import {Relation} from '@/Relation'
import {TestUser} from './TestUser'

export class TestParentGroup extends Model {
  id: number = 0
  name: string = ''
  user = new Relation(TestUser)

  constructor(data: object = {}) {
    super()
    this.fillable = ['id', 'name', 'user']
    this.data = data
  }
}
