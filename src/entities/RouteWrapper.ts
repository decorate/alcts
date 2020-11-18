import { IRouteWrapper } from '@/interfaces/IRouteWrapper'
import { IRoute } from '@/interfaces/IRoute'

export class RouteWrapper implements IRouteWrapper {
	route: IRoute

	constructor(route: IRoute) {
		this.route = route
	}
}