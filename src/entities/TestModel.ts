import Model from "@/Model";
import {ArrayMappable} from "@/entities/ArrayMappable";
import {IIndexable} from "@/interfaces/IIndexxable";

export class User extends Model{
	id: number = 0
	name: string = ''
	email: string = ''
	hide: boolean = false
	ignores: boolean = true
	comments: Array<Comment> = []
	userDetail: UserDetail = new UserDetail
	userPosts: Post[] = []

	constructor(data: IIndexable) {
		super()

		this.fillable = ['id', 'name', 'email', 'comments', 'userDetail', 'hide', 'userPosts', 'ignores']
		//this.presents = ['hide']
		this.ignore = ['ignores', 'comments', 'userDetail', 'userPosts']

		this.arrayMap(
			new ArrayMappable(Comment),
			new ArrayMappable(Post).bind('userPosts')
		)

		this.data = data
	}

	afterPostable(res: User) {
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
