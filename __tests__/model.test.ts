import { Post, User } from '@/entities/TestModel'
describe('model test', () => {
	test('test', () => {
		const s = new User({
			name: 'A',
			email: 'test@mail.com',
			userPosts: [new Post({title: 'A+'})]
		})

		const data = s.getPostable()

		expect(s.hide).toBe(false)
		expect(s.userPosts.length).toBe(1)
		expect(data.hide).toBe(false)

		expect(data).toEqual({
			id: 0,
			name: 'A',
			email: 'test@mail.com',
			hide: false,
		})
	})
})