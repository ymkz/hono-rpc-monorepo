import type { ApiRouteType } from '@app/api'
import { hc } from 'hono/client'

export const client = hc<ApiRouteType>('http://localhost:8080')
