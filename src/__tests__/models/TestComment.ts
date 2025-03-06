/**
 * テスト用のコメントモデル
 */
import Model from '../../Model'
import {Relation} from '../../Relation'
import {TestUser} from './TestUser'
import {TestPost} from './TestPost'

export class TestComment extends Model {
  /**
   * コメントのID
   */
  id: number = 0

  /**
   * コメントのテキスト
   */
  content: string = ''

  /**
   * コメントの作成者
   */
  user: Relation<TestUser> = new Relation(TestUser)

  /**
   * コメントが属する投稿
   */
  post: Relation<TestPost> = new Relation(TestPost)

  constructor(data: object = {}) {
    super()
    this.fillable = ['id', 'content', 'user', 'post']

    if (Object.keys(data).length > 0) {
      this.data = data
    }
  }

  /**
   * リレーションの定義
   */
  protected relations = {
    user: new Relation(TestUser),
    post: new Relation(TestPost),
  }
}
