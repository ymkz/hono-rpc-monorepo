import { createFactory } from "hono/factory";

export type AppEnv = {
	Bindings: never;
	Variables: never;
};

export const factory = createFactory<AppEnv>();
