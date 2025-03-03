import { config } from '@dotenvx/dotenvx';
import { defineConfig } from 'vitest/config';

config({ path: '.env.test' });

export default defineConfig(() => ({
	test: {
		silent: true,
		restoreMocks: true,
		include: ['src/**/*.test.ts'],
		coverage: { reporter: ['text', 'json', 'html'] },
	},
}));
