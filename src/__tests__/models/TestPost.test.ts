/**
 * TestPostのテスト
 */
import {TestPost} from './TestPost'
import {TestUser} from './TestUser'
import {TestComment} from './TestComment'

describe('TestPost', () => {
  let post: TestPost

  beforeEach(() => {
    post = new TestPost()
  })

  it('should create a new post', () => {
    expect(post.id).toBe(0)
    expect(post.title).toBe('')
    expect(post.content).toBe('')
  })

  it('should update post data', () => {
    const data = {
      id: 1,
      title: 'test post',
      content: 'test post content',
    }

    post.update(data)

    expect(post.id).toBe(1)
    expect(post.title).toBe('test post')
    expect(post.content).toBe('test post content')
  })

  it('should handle comments', () => {
    const data = {
      id: 1,
      title: 'test post',
      content: 'test post content',
      comments: [
        {
          id: 1,
          content: 'test comment 1',
        },
        {
          id: 2,
          content: 'test comment 2',
        },
      ],
    }

    post.update(data)

    expect(post.comments[0].content).toBe('test comment 1')
    expect(post.comments[1].content).toBe('test comment 2')
  })
})
