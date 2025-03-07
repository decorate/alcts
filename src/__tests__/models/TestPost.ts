/**
 * テスト用の投稿モデル
 */
import Model from '../../Model'
import {Relation} from '../../Relation'
import {TestUser} from './TestUser'
import {TestComment} from './TestComment'
import {ArrayMappable} from '../../entities/ArrayMappable'

export class TestPost extends Model {
  /**
   * 投稿のID
   */
  id: number = 0

  /**
   * 投稿のタイトル
   */
  title: string = ''

  /**
   * 投稿の内容
   */
  content: string = ''

  /**
   * 投稿の作成者
   */
  user: Relation<TestUser> = new Relation(TestUser)

  /**
   * 投稿のコメント
   */
  comments: TestComment[] = []

  constructor(data: object = {}) {
    super()
    this.fillable = ['id', 'title', 'content', 'user', 'comments']

    this.arrayMap(new ArrayMappable(TestComment).bind('comments'))

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
