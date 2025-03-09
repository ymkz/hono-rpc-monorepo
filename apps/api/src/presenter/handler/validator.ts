import type { Hook } from "@hono/zod-validator";
import { fromError, fromZodIssue } from "zod-validation-error";
import type { AppEnv } from "../../helper/factory";
import { logger } from "../../helper/logger";

export const validatorHookHandler: Hook<unknown, AppEnv, string> = (result, ctx) => {
	if (!result.success) {
		logger.warn({ issues: result.error.issues }, "InvalidRequestParameters");
		return ctx.json(
			{
				status: 400,
				type: "https://github.com/ymkz/hono-rpc-monorepo/blob/main/apps/api/docs/error/invalid-request-parameters.md",
				title: "InvalidRequestParameters",
				detail: "リクエストパラメータが不正です。",
				instance: ctx.req.routePath,
				issues: fromError(result.error).details,
			},
			400,
		);
	}
};
