/**
 * TestCommentのテスト
 */
import {TestComment} from './TestComment'

describe('TestComment', () => {
  let comment: TestComment

  beforeEach(() => {
    comment = new TestComment()
  })

  it('should create a new comment', () => {
    expect(comment.id).toBe(0)
    expect(comment.content).toBe('')
  })

  it('should update comment data', () => {
    const data = {
      id: 1,
      content: 'test comment',
    }

    comment.update(data)

    expect(comment.id).toBe(1)
    expect(comment.content).toBe('test comment')
  })

  it('should handle user and post relations', () => {
    const data = {
      id: 1,
      content: 'test comment',
      user: {
        id: 1,
        name: 'test user',
      },
      post: {
        id: 1,
        title: 'test post',
      },
    }

    comment.update(data)

    const user = comment.user.get()
    const post = comment.post.get()
    expect(user).toBeDefined()
    expect(post).toBeDefined()
    expect(user!.name).toBe('test user')
    expect(post!.title).toBe('test post')
  })
})
