import {MockResponse} from 'axios-mock-server'

const user = {
	id: '101',
	name: 'test',
	app_email: 'test@email',
	comments: [
		{ title: 'Typescript', body: 'body' },
		{ title: 'javascript', body: 'Js' }
	],
	user_detail: {
		age: 32, address: '葛飾区'
	},
	user_posts: [{ type: 2, title: 'C#' }]
}

export default {
	get: (d: any) => {
		return [200, user] as MockResponse
	},
	post: (d: any) => {
		return [200, {user, token: 'ok token'}] as MockResponse
	}
}