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
	import {IModel} from './interfaces/IModel'
    import {User} from './entities/SomeModel'
	import { RouteWrapper } from './entities/RouteWrapper'
	import { IRoute } from './interfaces/IRoute'
    import axios from 'axios'
	import { Paginate } from './plugins/PaginateFactory'

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

			const paginate = {
				data: [
					{
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
					},
                ],
				"total": 50,
				"per_page": 15,
				"current_page": 1,
				"last_page": 4,
				"first_page_url": "http://laravel.app?page=1",
				"last_page_url": "http://laravel.app?page=4",
				"next_page_url": "http://laravel.app?page=2",
				"prev_page_url": null,
				"path": "http://laravel.app",
				"from": 1,
				"to": 15,
            }

            const p = Paginate.setModel(User).create(paginate)
            console.log(p)
		}
	})
	export default class App extends Vue {}

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
