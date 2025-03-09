import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	server: {
		// defaults :: 環境変数で上書き可能
		APP_PORT: z.optional(z.string().transform(Number).pipe(z.number().int())).default("8080"),
		LOG_LEVEL: z.enum(["debug", "info", "warn", "error", "silent"]).default("info"),

		// configs :: `.env.{envionment}`から設定される
		NODE_ENV: z.enum(["development", "production", "test"]),
		APP_ENV: z.enum(["local", "test", "alpha", "beta", "live"]),
		HEALTHCHECK: z.enum(["UP", "DOWN"]),
		MYSQL_HOST: z.string(),
		MYSQL_USER: z.string(),
		MYSQL_DATABASE: z.string(),

		// credentials :: 実行環境で環境変数として設定する必要があるクレデンシャル
		MYSQL_PASSWORD: z.string(),
	},
});
