/**
 * テスト用のコメントモデル
 */
import Model from '../../Model'
import {Relation} from '../../Relation'
import {TestUser} from './TestUser'

export class TestComment extends Model {
  /**
   * コメントのID
   */
  id: number = 0

  /**
   * コメントのテキスト
   */
  text: string = ''

  /**
   * コメントの作成者
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
