/* eslint-disable */
import { AxiosInstance } from 'axios'
import mockServer from 'axios-mock-server'
import mock0 from './users'
import mock1 from './user'

export default (client?: AxiosInstance) => mockServer([
  {
    path: '/users',
    methods: mock0
  },
	{
		path: '/user',
		methods: mock1
	}
], client, '')
