/**
 * TestCommentのテスト
 */
import {TestComment} from './TestComment'
import {TestUser} from './TestUser'
import {TestPost} from './TestPost'

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

    expect(comment.user.get().name).toBe('test user')
    expect(comment.post.get().title).toBe('test post')
  })
})
