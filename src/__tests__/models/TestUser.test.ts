/**
 * TestUserのテスト
 */
import {TestUser} from './TestUser'

describe('TestUser', () => {
  let user: TestUser

  beforeEach(() => {
    user = new TestUser()
  })

  it('should create a new user', () => {
    expect(user.id).toBe(0)
    expect(user.name).toBe('')
    expect(user.email).toBe('')
    expect(user.type).toBe(0)
  })

  it('should update user data', () => {
    const data = {
      id: 1,
      name: 'test user',
      email: 'test@example.com',
      type: 1,
    }

    user.update(data)

    expect(user.id).toBe(1)
    expect(user.name).toBe('test user')
    expect(user.email).toBe('test@example.com')
    expect(user.type).toBe(1)
  })

  it('should handle posts and comments', () => {
    const data = {
      id: 1,
      name: 'test user',
      email: 'test@example.com',
      type: 1,
      posts: [
        {
          id: 1,
          title: 'test post 1',
          content: 'test post 1 content',
        },
        {
          id: 2,
          title: 'test post 2',
          content: 'test post 2 content',
        },
      ],
      user_comments: [
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

    user.update(data)

    expect(user.posts[0].title).toBe('test post 1')
    expect(user.posts[1].title).toBe('test post 2')
    expect(user.userComments[0].content).toBe('test comment 1')
    expect(user.userComments[1].content).toBe('test comment 2')
  })

  it('should have testChild relation with camelCase not converted', () => {
    const mockData = {
      id: 1,
      name: 'test user',
      email: 'test@example.com',
      type: 1,
      posts: [
        {
          id: 1,
          title: 'test post 1',
          content: 'test post 1 content',
        },
        {
          id: 2,
          title: 'test post 2',
          content: 'test post 2 content',
        },
      ],
      user_comments: [
        {
          id: 1,
          content: 'test comment 1',
        },
        {
          id: 2,
          content: 'test comment 2',
        },
      ],
      testChild: {
        id: 1,
        test_property_one: 'test',
      },
    }

    const user = new TestUser(mockData)

    expect(user.testChild.get()?.test_property_one).toBe('test')
  })

  it('should get postable data', () => {
    const data = {
      id: 1,
      name: 'test user',
      email: 'test@example.com',
      type: 1,
      posts: [
        {
          id: 1,
          title: 'test post 1',
          content: 'test post 1 content',
        },
        {
          id: 2,
          title: 'test post 2',
          content: 'test post 2 content',
        },
      ],
      user_comments: [
        {
          id: 1,
          content: 'test comment 1',
        },
        {
          id: 2,
          content: 'test comment 2',
        },
      ],
      testChild: {
        id: 1,
        test_property_one: 'test',
      },
    }

    user.update(data)

    const postable = user.getPostable()

    expect(postable).toEqual({
      id: 1,
      name: 'test user',
      email: 'test@example.com',
      type: 1,
      posts: [
        {
          id: 1,
          title: 'test post 1',
          content: 'test post 1 content',
          comments: [],
          camel_case_property: '',
        },
        {
          id: 2,
          title: 'test post 2',
          content: 'test post 2 content',
          comments: [],
          camel_case_property: '',
        },
      ],
      user_comments: [
        {
          id: 1,
          content: 'test comment 1',
        },
        {
          id: 2,
          content: 'test comment 2',
        },
      ],
      test_child: {
        id: 1,
        test_property_one: 'test',
        test_property_two: 0,
        test_property_three: false,
        array_mappable_property: [],
      },
    })
  })
})
