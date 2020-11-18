import { Paginate as P, PaginateConfig } from '@/entities/Paginate'
import { route } from '@/store'
import { RouteWrapper } from '@/entities/RouteWrapper'

const config: PaginateConfig = {
	routerWrapper: new RouteWrapper(route),
	getApi: (url: string) => {},
}

export const Paginate = P.generate(config)
