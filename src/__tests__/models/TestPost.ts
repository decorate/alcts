/**
 * テスト用の投稿モデル
 */
import Model from '../../Model'
import {Relation} from '../../Relation'
import {TestUser} from './TestUser'

export class TestPost extends Model {
  /**
   * 投稿のテキスト
   */
  text: string = ''

  /**
   * 投稿の作成者
   */
  user: Relation<TestUser> = new Relation(TestUser)

  constructor(data: object = {}) {
    super()
    this.fillable = ['id', 'text', 'user']
    this.data = data
  }

  /**
   * リレーションの定義
   */
  protected relations = {
    user: new Relation(TestUser),
  }
}
