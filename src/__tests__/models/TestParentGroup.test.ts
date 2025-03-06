/**
 * TestParentGroupのテスト
 */
import {TestParentGroup} from './TestParentGroup'
import {TestUser} from './TestUser'
import {Relation} from '@/Relation'

describe('TestParentGroup', () => {
  let parentGroup: TestParentGroup

  beforeEach(() => {
    parentGroup = new TestParentGroup()
  })

  it('should create a new parent group', () => {
    expect(parentGroup.id).toBe(0)
    expect(parentGroup.name).toBe('')
    expect(parentGroup.user.get()).toBeUndefined()
  })

  it('should update parent group data', () => {
    const data = {
      id: 1,
      name: 'test group',
    }

    parentGroup.update(data)

    expect(parentGroup.id).toBe(1)
    expect(parentGroup.name).toBe('test group')
  })

  it('should handle user relation', () => {
    const data = {
      id: 1,
      name: 'test group',
      user: {
        id: 1,
        name: 'test user',
      },
    }

    parentGroup.update(data)

    expect(parentGroup.user.get().name).toBe('test user')
  })

  it('should handle nested user relations', () => {
    const user = new TestUser()
    user.name = 'test user'

    parentGroup.user.set(user)
    user.parentGroup.set(parentGroup)

    expect(user.parentGroup.get().name).toBe('test group')
  })

  describe('循環参照のテスト', () => {
    it('TestUserとTestParentGroupの間で循環参照が発生しないこと', () => {
      const user = new TestUser()
      const parentGroup = new TestParentGroup()

      // ユーザーに親グループを設定
      user.parentGroup = new Relation(TestParentGroup)
      user.parentGroup.set(parentGroup)

      // 親グループにユーザーを設定
      parentGroup.user.set(user)

      // 循環参照が発生していないことを確認
      expect(user.parentGroup.get()).toBe(parentGroup)
      expect(parentGroup.user.get()).toBe(user)

      // データの整合性を確認
      const userData = {
        id: 1,
        name: 'test user',
        parent_group: {
          id: 1,
          name: 'test group',
        },
      }

      const groupData = {
        id: 1,
        name: 'test group',
        user: {
          id: 1,
          name: 'test user',
        },
      }

      user.data = userData
      parentGroup.data = groupData

      expect(user.parentGroup.get().name).toBe('test group')
      expect(parentGroup.user.get().name).toBe('test user')
    })

    it('深い循環参照のパターンでも正しく動作すること', () => {
      const userData = {
        id: 1,
        name: 'test user',
        parent_group: {
          id: 1,
          name: 'test group',
          user: {
            id: 2,
            name: 'test2-user',
          },
        },
      }

      const user = new TestUser()
      user.data = userData

      // 親グループの取得と検証
      const parentGroup = user.parentGroup.get()
      expect(parentGroup).toBeInstanceOf(TestParentGroup)
      expect(parentGroup.id).toBe(1)
      expect(parentGroup.name).toBe('test group')

      // 親グループのユーザーの取得と検証
      const parentGroupUser = parentGroup.user.get()
      expect(parentGroupUser).toBeInstanceOf(TestUser)
      expect(parentGroupUser.id).toBe(2)
      expect(parentGroupUser.name).toBe('test2-user')

      // データの整合性を確認
      expect(user.parentGroup.get().name).toBe('test group')
      expect(user.parentGroup.get().user.get().name).toBe('test2-user')
    })

    it('コンストラクタでデータを渡した場合でも正しく動作すること', () => {
      const userData = {
        id: 1,
        name: 'test user',
        parent_group: {
          id: 1,
          name: 'test group',
          user: {
            id: 2,
            name: 'test2-user',
          },
        },
      }

      const user = new TestUser(userData)

      // 親グループの取得と検証
      const parentGroup = user.parentGroup.get()
      expect(parentGroup).toBeInstanceOf(TestParentGroup)
      expect(parentGroup.id).toBe(1)
      expect(parentGroup.name).toBe('test group')

      // 親グループのユーザーの取得と検証
      const parentGroupUser = parentGroup.user.get()
      expect(parentGroupUser).toBeInstanceOf(TestUser)
      expect(parentGroupUser.id).toBe(2)
      expect(parentGroupUser.name).toBe('test2-user')

      // データの整合性を確認
      expect(user.parentGroup.get().name).toBe('test group')
      expect(user.parentGroup.get().user.get().name).toBe('test2-user')
    })
  })
})
