import type { ErrorHandler } from "hono";
import { logger } from "../../helper/logger";

export const errorHandler: ErrorHandler = (err, ctx) => {
	// TODO: エラーインスタンス別にログ出力とレスポンスを実装する

	logger.error(err, "UnexpectedError");
	return ctx.json(
		{
			status: 500,
			type: "https://github.com/ymkz/hono-rpc-monorepo/blob/main/apps/api/docs/error/unexpected-error.md",
			title: "UnexpectedError",
			detail: "想定外のエラーが発生しました。",
			instance: ctx.req.routePath,
		},
		500,
	);
};
