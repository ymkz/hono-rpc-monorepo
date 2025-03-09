import { nanoid } from "nanoid";
import { context } from "../../helper/context";
import { factory } from "../../helper/factory";

export const setReqId = () => {
	return factory.createMiddleware(async (ctx, next) => {
		const header = ctx.req.header();
		const reqId = header["X-Request-Id"] ?? nanoid();

		context.getStore()?.set("reqId", reqId);

		await next();
	});
};
