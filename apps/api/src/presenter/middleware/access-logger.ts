import { getConnInfo } from "@hono/node-server/conninfo";
import { factory } from "../../helper/factory";
import { logger } from "../../helper/logger";

const duration = (start: number) => {
	const delta = performance.now() - start;
	return Number.parseFloat(delta.toFixed(6)); // 小数点第6位まで四捨五入して丸める
};

const IGNORE_PATH = /^\/(favicon|healthz|spec)?$/;

export const accessLogger = () => {
	return factory.createMiddleware(async (ctx, next) => {
		if (IGNORE_PATH.test(ctx.req.path)) return await next();

		const start = performance.now();

		const connInfo = getConnInfo(ctx);
		const requestInfo = { method: ctx.req.method, url: ctx.req.url, remoteAddr: connInfo.remote.address };
		logger.info({ access: { ...requestInfo } }, "request incoming");

		await next();

		const responseInfo = { status: ctx.res.status, durationMs: duration(start) };
		logger.info({ access: { ...requestInfo, ...responseInfo } }, "response completed");
	});
};
