/**
 * Relationクラスのテスト
 */
import {Relation} from '@/Relation'
import {TestUser} from './models/TestUser'
import {TestParentGroup} from './models/TestParentGroup'

describe('Relation', () => {
  let relation: Relation<TestUser>

  beforeEach(() => {
    relation = new Relation(TestUser)
  })

  describe('初期化', () => {
    it('コンストラクタでモデルクラスを受け取ること', () => {
      expect(relation).toBeInstanceOf(Relation)
    })

    it('初期状態でvalueがnullであること', () => {
      const privateValue = (relation as any).value
      expect(privateValue).toBeNull()
    })
  })

  describe('get()', () => {
    it('初回アクセス時にモデルインスタンスを生成すること', () => {
      const value = relation.get()
      expect(value).toBeInstanceOf(TestUser)
    })

    it('2回目以降のアクセスで同じインスタンスを返すこと', () => {
      const firstValue = relation.get()
      const secondValue = relation.get()
      expect(firstValue).toBe(secondValue)
    })
  })

  describe('set()', () => {
    it('モデルインスタンスを直接設定できること', () => {
      const user = new TestUser()
      relation.set(user)
      expect(relation.get()).toBe(user)
    })

    it('オブジェクトを渡した場合、新しいモデルインスタンスを生成すること', () => {
      const data = {id: 1, name: 'Test User'}
      relation.set(data)
      const value = relation.get()
      expect(value).toBeInstanceOf(TestUser)
      expect(value.id).toBe(1)
      expect(value.name).toBe('Test User')
    })

    it('無効な値を渡した場合、空のモデルインスタンスを生成すること', () => {
      relation.set(null)
      const value = relation.get()
      expect(value).toBeInstanceOf(TestUser)
      expect(value.id).toBe(0)
      expect(value.name).toBe('')
    })
  })

  describe('循環参照の処理', () => {
    it('TestUserとTestParentGroupの相互参照が正しく機能すること', () => {
      const user = new TestUser()
      const parentGroup = new TestParentGroup()

      user.parentGroup.set(parentGroup)
      parentGroup.user.set(user)

      expect(user.parentGroup.get()).toBe(parentGroup)
      expect(parentGroup.user.get()).toBe(user)
    })
  })
})
