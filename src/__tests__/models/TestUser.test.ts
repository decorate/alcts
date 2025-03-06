/**
 * TestUserのテスト
 */
import {TestUser} from './TestUser'
import {TestPost} from './TestPost'
import {TestComment} from './TestComment'

describe('TestUser', () => {
  let user: TestUser

  beforeEach(() => {
    user = new TestUser()
  })

  describe('初期化', () => {
    it('デフォルト値が正しく設定されること', () => {
      expect(user.name).toBe('')
      expect(user.email).toBe('')
      expect(user.posts).toEqual([])
      expect(user.userComments).toEqual([])
    })

    it('fillableプロパティが正しく設定されること', () => {
      expect(user.fillable).toEqual([
        'id',
        'name',
        'email',
        'type',
        'posts',
        'userComments',
        'parentGroup',
      ])
    })
  })

  describe('データの設定', () => {
    it('データが正しく設定されること', () => {
      const data = {
        id: 1,
        name: 'test-user',
        email: 'test@mail.com',
        type: 1,
        posts: [
          {id: 1, text: 'test post 1'},
          {id: 2, text: 'test post 2'},
        ],
        user_comments: [
          {id: 1, text: 'test comment 1'},
          {id: 2, text: 'test comment 2'},
        ],
        parent_group: {
          id: 1,
          name: 'Test Group',
        },
      }

      user.data = data

      expect(user.id).toBe(1)
      expect(user.name).toBe('test-user')
      expect(user.email).toBe('test@mail.com')
      expect(user.parentGroup.get().id).toBe(1)
      expect(user.parentGroup.get().name).toBe('Test Group')

      expect(user.posts).toHaveLength(2)
      expect(user.posts[0]).toBeInstanceOf(TestPost)
      expect(user.posts[0].text).toBe('test post 1')
      expect(user.posts[1].text).toBe('test post 2')

      expect(user.userComments).toHaveLength(2)
      expect(user.userComments[0]).toBeInstanceOf(TestComment)
      expect(user.userComments[0].text).toBe('test comment 1')
      expect(user.userComments[1].text).toBe('test comment 2')
    })
  })
})
