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
	import {IIndexable, IModel, IRoute} from './interfaces'
	import {ArrayMappable} from './entities/ArrayMappable'
    import {User} from './entities/SomeModel'
	import { RouteWrapper } from './entities/RouteWrapper'
    import axios from 'axios'
    import mock from '../mocks/$mock'
	import { Paginate } from './plugins/PaginateFactory'

    mock()

	@Component({
		components: {
			HelloWorld,
		},
	})
	export default class App extends Vue {

		paginate = Paginate.generate()

		async created() {
			// const paginate = {
			// data: [
			// 	{
			// 		id: '101',
			// 		name: 'test',
			// 		app_email: 'test@email',
			// 		comments: [
			// 			{title: 'Typescript', body: 'body'},
			// 			{title: 'javascript', body: 'Js'}
			// 		],
			// 		user_detail: {
			// 			age: 32, address: '葛飾区'
			// 		},
			// 		user_posts: [
			// 			{type: 2, title: 'C#'}
			// 		]
			// 	},
			//     ],
			// "total": 50,
			// "per_page": 15,
			// "current_page": 1,
			// "last_page": 4,
			// "first_page_url": "http://laravel.app?page=1",
			// "last_page_url": "http://laravel.app?page=4",
			// "next_page_url": "http://laravel.app?page=2",
			// "prev_page_url": null,
			// "path": "http://laravel.app",
			// "from": 1,
			// "to": 15,
			// }

      const d = await axios.get('/user')
      const u = new User(d.data)

      type res = {
        user: User,
        token: string
      }
      const {data} = await u.post<res>('/user')
      console.log(data.user)

      //
			// const { data } = await axios.get('/users')
			// this.paginate.setModel(User).create(data)
			// await this.paginate.nextUpdate()
      //
			// this.paginate.getData<User>().map(x => console.log(x))
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
