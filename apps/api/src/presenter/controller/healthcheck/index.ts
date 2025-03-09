import { env } from "../../../helper/env";
import { factory } from "../../../helper/factory";

export const healthcheckHandlers = factory.createHandlers(async (ctx) => {
	if (env.HEALTHCHECK === "UP") return ctx.json({ status: "UP" }, 200);
	return ctx.json({ status: "DOWN" }, 503);
});
