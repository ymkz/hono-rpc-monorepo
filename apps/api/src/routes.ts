import { factory } from './helper/factory'
import { searchBooksHandlers } from './presenter/controller/books/search-books'
import { healthcheckHandlers } from './presenter/controller/healthcheck/index'
import { errorHandler } from './presenter/handler/error'
import { notFoundHandler } from './presenter/handler/notfound'
import { accessLogger } from './presenter/middleware/access-logger'
import { runContext } from './presenter/middleware/run-context'
import { setReqId } from './presenter/middleware/set-req-id'

const app = factory.createApp()

app.notFound(notFoundHandler)
app.onError(errorHandler)

app.use(runContext())
app.use(setReqId())
app.use(accessLogger())

app.get('/', ...healthcheckHandlers)
app.get('/healthz', ...healthcheckHandlers)

const apiRoute = app.get('/api/v1/books', ...searchBooksHandlers)

type ApiRouteType = typeof apiRoute

export { app }
export type { ApiRouteType }
