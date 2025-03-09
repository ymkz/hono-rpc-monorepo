import { context } from "../../helper/context";
import { factory } from "../../helper/factory";

export const runContext = () => {
	return factory.createMiddleware(async (_, next) => {
		return context.run(new Map(), next);
	});
};
