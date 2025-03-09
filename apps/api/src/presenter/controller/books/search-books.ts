import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { isbn13Schema } from "../../../domain/value/isbn";
import { factory } from "../../../helper/factory";
import { validatorHookHandler } from "../../handler/validator";

const querySchema = z
	.object({
		isbn: isbn13Schema.optional(),
		title: z.string().optional(),
		status: z.enum(["published", "unpublished", "out_of_print"]).optional(),
		priceFrom: z.coerce.number().int().gte(0).optional(),
		priceTo: z.coerce.number().int().gte(1).optional(),
		publishedAtStart: z.string().datetime().optional(),
		publishedAtEnd: z.string().datetime().optional(),
		authorName: z.string().optional(),
		publisherName: z.string().optional(),
		sort: z.enum(["-published_at", "+published_at", "-price", "+price"]).default("-published_at"),
		offset: z.coerce.number().int().gte(0).default(0),
		limit: z.coerce.number().int().gte(1).lte(100).default(20),
	})
	.optional();

const responseSchema = z.object({
	pagination: z.object({
		total: z.number().int().min(0),
		offset: z.number().int().min(0),
		limit: z.number().int().min(1).max(100),
	}),
	hits: z.array(
		z.object({
			bookId: z.number(),
			isbn: z.string(),
			title: z.string(),
			price: z.number(),
			publishedAt: z.string().datetime(),
			authorId: z.number(),
			authorName: z.string(),
			publisherId: z.number(),
			publisherName: z.string(),
		}),
	),
});

type ResponseType = z.infer<typeof responseSchema>;

export const searchBooksHandlers = factory.createHandlers(
	zValidator("query", querySchema, validatorHookHandler),
	async (ctx) => {
		const query = ctx.req.valid("query");

		// const books = await searchBooks({
		// 	isbn: query.isbn,
		// 	title: query.title,
		// 	authorName: query.authorName,
		// 	publisherName: query.publisherName,
		// 	priceFrom: query.priceFrom,
		// 	priceTo: query.priceTo,
		// 	publishedAtFrom: query.publishedAtFrom ? new Date(query.publishedAtFrom) : undefined,
		// 	publishedAtTo: query.publishedAtTo ? new Date(query.publishedAtTo) : undefined,
		// 	sort: query.sort,
		// })

		const response: ResponseType = {
			pagination: { total: 0, offset: 0, limit: 0 },
			hits: [
				{
					bookId: 1,
					isbn: "9784798163560",
					title: "JavaScript本格入門",
					price: 3200,
					publishedAt: "2020-07-31T00:00:00.000Z",
					authorId: 1,
					authorName: "山田太郎",
					publisherId: 1,
					publisherName: "山田出版",
				},
			],
		};

		return ctx.json(response);
	},
);
