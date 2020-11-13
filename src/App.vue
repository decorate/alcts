<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    </div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import HelloWorld from './components/HelloWorld.vue';
	import Model from './Model'
		import {IIndexable} from './interfaces/IIndexxable'
		import {ArrayMappable} from './entities/ArrayMappable'

	@Component({
		components: {
			HelloWorld,
		},
		created() {
					const d = {
						id: '101',
						name: 'test',
						app_email: 'test@email',
                        comments: [
                          {title: 'Typescript', body: 'body'},
                          {title: 'javascript', body: 'Js'}
                        ],
                        user_detail: {
							age: 32, address: '葛飾区'
                        },
                        user_posts: [
                          {type: 2, title: 'C#'}
                        ]
					}
			const u = new Model(d).create(User)
            console.log(u)
		}
	})
	export default class App extends Vue {}

	interface IUser {
		id: number
		name: string
		appEmail: string
	}

	class User extends Model{

		id: number = 0
		name: string = ''
		appEmail: string = ''
        hide: boolean = false
        comments: Array<Comment> = []
        userDetail: UserDetail = new UserDetail
        userPosts: Array<Post> = []

		constructor() {
			super({})

            this.fillable = ['id', 'name', 'appEmail', 'comments', 'userDetail', 'hide', 'userPosts']
            this.presents = ['hide']

            this.arrayMap(
            	new ArrayMappable(Comment),
                new ArrayMappable(Post).bind('userPosts')
            )
		}

        afterPostable(res: IIndexable) {
        }
	}

	class Comment extends Model {
		title: string
        body: string

        constructor() {
			super({})

            this.fillable = ['title', 'body']

            this.title = ''
            this.body = ''
        }
    }

    class UserDetail extends Model {
		age: number
        address: string

        constructor() {
			super({})

          this.fillable = ['age', 'address']

          this.age = 0
          this.address = ''
        }
    }

    class Post extends Model {
		type: number = 1
        title: string = ''

        constructor() {
			super({})

            this.fillable = ['type', 'title']
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
