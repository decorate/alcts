/**
 * Relationクラスのテスト
 */
import {Relation} from '../Relation'
import {TestUser} from './models/TestUser'
import {TestParentGroup} from './models/TestParentGroup'

describe('Relation', () => {
  let user: TestUser
  let parentGroup: TestParentGroup

  beforeEach(() => {
    user = new TestUser()
    parentGroup = new TestParentGroup()
  })

  it('should create a new relation', () => {
    const relation = new Relation(TestUser)
    expect(relation.get()).toBeUndefined()
  })

  it('should set and get relation data', () => {
    const relation = new Relation(TestUser)
    const userData = {
      id: 1,
      name: 'test user',
    }

    relation.set(userData)
    const result = relation.get()
    expect(result).toBeDefined()
    expect(result!.id).toBe(1)
    expect(result!.name).toBe('test user')
  })

  it('should handle nested relations', () => {
    const userData = {
      id: 1,
      name: 'test user',
      parentGroup: {
        id: 1,
        name: 'test group',
      },
    }

    user.update(userData)
    const result = user.parentGroup.get()
    expect(result).toBeDefined()
    expect(result!.id).toBe(1)
    expect(result!.name).toBe('test group')
  })
})
