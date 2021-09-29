import { Paginate as P} from '@/entities/Paginate'
import { route } from '@/store'
import { RouteWrapper } from '@/entities/RouteWrapper'
import axios from 'axios'
import { PaginateConfig } from '@/interfaces/PaginateConfig'

const config: PaginateConfig = {
	routerWrapper: new RouteWrapper(route),
	getApi: axios.get,
}

export const Paginate = new P(config)
