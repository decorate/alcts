/**
 * テスト用のユーザーモデル
 * @class TestUser
 * @extends {Model}
 */
import Model from '../../Model'
import {Relation} from '../../Relation'
import {TestParentGroup} from './TestParentGroup'
import {TestPost} from './TestPost'
import {ArrayMappable} from '../../entities/ArrayMappable'
import {TestComment} from './TestComment'
import {TestChild} from './TestChild'

export class TestUser extends Model {
  id: number = 0
  name: string = ''
  email: string = ''
  type: number = 0
  parentGroup: Relation<TestParentGroup> = new Relation(TestParentGroup)
  posts: TestPost[] = []
  userComments: TestComment[] = []
  testChild: Relation<TestChild> = new Relation(TestChild)

  constructor(data: object = {}) {
    super()
    this.fillable = [
      'id',
      'name',
      'email',
      'type',
      'posts',
      'userComments',
      'parentGroup',
      'testChild',
    ]

    this.arrayMap(
      new ArrayMappable(TestPost).bind('posts'),
      new ArrayMappable(TestComment).bind('userComments')
    )

    if (Object.keys(data).length > 0) {
      this.data = data
    }
  }
}
