import { pino } from 'pino';
import { Temporal } from 'temporal-polyfill';
import { context } from './context';
import { env } from './env';

const timestamp = () => {
	return Temporal.Now.zonedDateTimeISO().toString();
};

export const logger = pino({
	enabled: env.NODE_ENV !== 'test',
	level: env.LOG_LEVEL,
	timestamp: () => `,"time":"${timestamp()}"`,
	formatters: {
		level: (label) => ({ severity: label }),
		bindings: () => ({}),
	},
	mixin: () => ({
		reqId: context.getStore()?.get('reqId'),
	}),
});
