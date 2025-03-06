/**
 * TestParentGroupのテスト
 */
import {TestParentGroup} from './TestParentGroup'

describe('TestParentGroup', () => {
  let group: TestParentGroup

  beforeEach(() => {
    group = new TestParentGroup()
  })

  describe('初期化', () => {
    it('デフォルト値が正しく設定されること', () => {
      expect(group.id).toBe(0)
      expect(group.name).toBe('')
    })

    it('fillableプロパティが正しく設定されること', () => {
      expect(group.fillable).toEqual(['id', 'name', 'user'])
    })
  })

  describe('データの設定', () => {
    it('データが正しく設定されること', () => {
      const data = {
        id: 1,
        name: 'test group',
      }

      group.data = data

      expect(group.id).toBe(1)
      expect(group.name).toBe('test group')
    })

    it('convertがfalseの場合、スネークケースのキーが変換されないこと', () => {
      const data = {
        id: 1,
        name: 'test group',
      }

      group.convert = false
      group.data = data

      expect(group.id).toBe(1)
      expect(group.name).toBe('test group')
    })
  })
})
