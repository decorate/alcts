import Model from "@/Model";
import {ArrayMappable} from "@/entities/ArrayMappable";
import {IIndexable} from "@/interfaces/IIndexxable";

export class User extends Model{
	id: number = 0
	name: string = ''
	appEmail: string = ''
	hide: boolean = false
	comments: Array<Comment> = []
	userDetail: UserDetail = new UserDetail
	userPosts: Array<Post> = []

	constructor(data: object = {}) {
		super()

		this.fillable = ['id', 'name', 'appEmail', 'comments', 'userDetail', 'hide', 'userPosts']
		this.presents = ['hide']

		this.arrayMap(
			new ArrayMappable(Comment),
			new ArrayMappable(Post).bind('userPosts')
		)

		this.data = data
	}

	afterPostable(res: IIndexable) {
	}
}

export class Comment extends Model {
	title: string
	body: string

	constructor(data: object = {}) {
		super()

		this.fillable = ['title', 'body']

		this.title = ''
		this.body = ''

		this.data = data
	}
}

export class UserDetail extends Model {
	age: number
	address: string

	constructor(data: object = {}) {
		super()

		this.fillable = ['age', 'address']

		this.age = 0
		this.address = ''

		this.data = data
	}
}

export class Post extends Model {
	type: number = 1
	title: string = ''

	constructor(data: object = {}) {
		super()

		this.fillable = ['type', 'title']

		this.data = data
	}
}
