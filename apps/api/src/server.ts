import { serve } from '@hono/node-server'
import { showRoutes } from 'hono/dev'
import { env } from './helper/env'
import { logger } from './helper/logger'
import { app } from './routes'

export type { ApiRouteType } from './routes'

showRoutes(app)

serve({ fetch: app.fetch, port: env.APP_PORT }, (info) => {
	logger.info(`Ready on http://localhost:${info.port} NODE_ENV=${env.NODE_ENV} APP_ENV=${env.APP_ENV}`)
})
