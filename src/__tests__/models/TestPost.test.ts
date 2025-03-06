/**
 * TestPostのテスト
 */
import {TestPost} from './TestPost'

describe('TestPost', () => {
  let post: TestPost

  beforeEach(() => {
    post = new TestPost()
  })

  describe('初期化', () => {
    it('デフォルト値が正しく設定されること', () => {
      expect(post.id).toBe(0)
      expect(post.text).toBe('')
    })

    it('fillableプロパティが正しく設定されること', () => {
      expect(post.fillable).toEqual(['id', 'text', 'user'])
    })
  })

  describe('データの設定', () => {
    it('データが正しく設定されること', () => {
      const data = {
        id: 1,
        text: 'test post',
      }

      post.data = data

      expect(post.id).toBe(1)
      expect(post.text).toBe('test post')
    })

    it('convertがfalseの場合、スネークケースのキーが変換されないこと', () => {
      const data = {
        id: 1,
        text: 'test post',
      }

      post.convert = false
      post.data = data

      expect(post.id).toBe(1)
      expect(post.text).toBe('test post')
    })
  })
})
