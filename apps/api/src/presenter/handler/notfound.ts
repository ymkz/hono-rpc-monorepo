import type { NotFoundHandler } from 'hono';

export const notFoundHandler: NotFoundHandler = (ctx) => {
	return ctx.json(
		{
			status: 404,
			type: 'https://github.com/ymkz/hono-rpc-monorepo/blob/main/apps/api/docs/error/not-found-resource.md',
			title: 'NotFoundResource',
			detail: 'リクエストされたリソースは存在しません。',
			instance: ctx.req.routePath,
		},
		404,
	);
};
