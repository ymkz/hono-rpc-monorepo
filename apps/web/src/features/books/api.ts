import { createLoader, parseAsInteger, parseAsString, parseAsStringEnum } from 'nuqs/server';
import type { inferParserType } from 'nuqs/server';
import { client, normalize as normalizeQuery } from '../../helper/client';

const booksSearchParams = {
	isbn: parseAsString,
	title: parseAsString,
	status: parseAsStringEnum(['PUBLISHED', 'UNPUBLISHED', 'OUT_OF_PRINT']),
	priceFrom: parseAsInteger,
	priceTo: parseAsInteger,
	publishedAtStart: parseAsString,
	publishedAtEnd: parseAsString,
	authorName: parseAsString,
	publisherName: parseAsString,
	sort: parseAsStringEnum(['-published_at', '+published_at', '-price', '+price']).withDefault('-published_at'),
	offset: parseAsInteger.withDefault(0),
	limit: parseAsInteger.withDefault(20),
};

export const loadBooksSearchParams = createLoader(booksSearchParams);

export const searchBooks = async (searchParams: inferParserType<typeof booksSearchParams>) => {
	const response = await client.api.v1.books.$get({
		// FIXME: queryの型がすべてstringになるのはなぜ？
		// FIXME: searchParamsをまとめてnormalizeQueryできないか？
		query: {
			isbn: normalizeQuery(searchParams.isbn),
			title: normalizeQuery(searchParams.title),
			status: normalizeQuery(searchParams.status),
			priceFrom: normalizeQuery(searchParams.priceFrom),
			priceTo: normalizeQuery(searchParams.priceTo),
			publishedAtStart: normalizeQuery(searchParams.publishedAtStart),
			publishedAtEnd: normalizeQuery(searchParams.publishedAtEnd),
			authorName: normalizeQuery(searchParams.authorName),
			publisherName: normalizeQuery(searchParams.publisherName),
			sort: normalizeQuery(searchParams.sort),
			offset: normalizeQuery(searchParams.offset),
			limit: normalizeQuery(searchParams.limit),
		},
	});

	// FIXME: 正常系以外の時にProblemDetailsがレスポンスされるのをハンドリングして、レスポンスに型をつけたい
	const data = await response.json();
	return data;
};
