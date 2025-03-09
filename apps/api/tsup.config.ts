import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/server.ts"],
	dts: "src/server.ts",
	format: "esm",
	clean: true,
	treeshake: true,
});
