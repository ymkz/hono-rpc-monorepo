import { createLoader, parseAsInteger, parseAsString, parseAsStringEnum } from 'nuqs/server'
import type { inferParserType } from 'nuqs/server'
import { client } from '../../helper/client'

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
}

export const loadBooksSearchParams = createLoader(booksSearchParams)

export const searchBooks = async (searchParams: inferParserType<typeof booksSearchParams>) => {
	const response = await client.api.v1.books.$get({
		// FIXME: queryの型がすべてstringになるのはなぜ？
		query: {
			isbn: searchParams.isbn || undefined,
			title: searchParams.title || undefined,
			status: searchParams.status || undefined,
			priceFrom: searchParams.priceFrom ? searchParams.priceFrom.toString() : undefined,
			priceTo: searchParams.priceTo ? searchParams.priceTo.toString() : undefined,
			publishedAtStart: searchParams.publishedAtStart || undefined,
			publishedAtEnd: searchParams.publishedAtEnd || undefined,
			authorName: searchParams.authorName || undefined,
			publisherName: searchParams.publisherName || undefined,
			sort: searchParams.sort,
			offset: searchParams.offset.toString(),
			limit: searchParams.limit.toString(),
		},
	})

	// FIXME: 正常系以外の時にProblemDetailsがレスポンスされるのをハンドリングして、レスポンスに型をつけたい
	const data = await response.json()
	return data
}
