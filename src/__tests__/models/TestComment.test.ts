/**
 * TestCommentのテスト
 */
import {TestComment} from './TestComment'

describe('TestComment', () => {
  let comment: TestComment

  beforeEach(() => {
    comment = new TestComment()
  })

  describe('初期化', () => {
    it('デフォルト値が正しく設定されること', () => {
      expect(comment.id).toBe(0)
      expect(comment.text).toBe('')
    })

    it('fillableプロパティが正しく設定されること', () => {
      expect(comment.fillable).toEqual(['id', 'text', 'user'])
    })
  })

  describe('データの設定', () => {
    it('データが正しく設定されること', () => {
      const data = {
        id: 1,
        text: 'test comment',
      }

      comment.data = data

      expect(comment.id).toBe(1)
      expect(comment.text).toBe('test comment')
    })

    it('convertがfalseの場合、スネークケースのキーが変換されないこと', () => {
      const data = {
        id: 1,
        text: 'test comment',
      }

      comment.convert = false
      comment.data = data

      expect(comment.id).toBe(1)
      expect(comment.text).toBe('test comment')
    })
  })
})
