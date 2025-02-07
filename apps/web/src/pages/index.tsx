import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { loadBooksSearchParams, searchBooks } from '../features/books/api'

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const searchParams = loadBooksSearchParams(context.query)
	const data = await searchBooks(searchParams)
	console.log(data)

	return {
		props: {
			searchParams,
		},
	}
}

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<>
			<div>
				<h1>
					<a href="/">Page</a>
				</h1>
				<div>{JSON.stringify(props.searchParams)}</div>
			</div>
			<hr />
			<form>
				<div>
					<label htmlFor="isbn">ISBN: </label>
					<input type="text" name="isbn" id="isbn" defaultValue={props.searchParams.isbn || undefined} />
				</div>
				<div>
					<label htmlFor="title">Title: </label>
					<input type="text" name="title" id="title" defaultValue={props.searchParams.title || undefined} />
				</div>
				<div>
					<label htmlFor="status">Status: </label>
					<select name="status" id="status" defaultValue={props.searchParams.status || undefined}>
						<option value="">すべて</option>
						<option value="PUBLISHED">出版済み</option>
						<option value="UNPUBLISHED">未出版</option>
						<option value="OUT_OF_PRINT">絶版</option>
					</select>
				</div>
				<div>
					<label htmlFor="priceFrom">Price From: </label>
					<input
						type="number"
						name="priceFrom"
						id="priceFrom"
						defaultValue={props.searchParams.priceFrom || undefined}
					/>
				</div>
				<div>
					<label htmlFor="priceTo">Price To: </label>
					<input type="number" name="priceTo" id="priceTo" defaultValue={props.searchParams.priceTo || undefined} />
				</div>
				<div>
					<label htmlFor="publishedAtStart">PublishedAtStart: </label>
					<input
						type="datetime-local"
						name="publishedAtStart"
						id="publishedAtStart"
						defaultValue={props.searchParams.publishedAtStart || undefined}
					/>
				</div>
				<div>
					<label htmlFor="publishedAtEnd">PublishedAtEnd: </label>
					<input
						type="datetime-local"
						name="publishedAtEnd"
						id="publishedAtEnd"
						defaultValue={props.searchParams.publishedAtEnd || undefined}
					/>
				</div>
				<div>
					<label htmlFor="authorName">AuthorName: </label>
					<input
						type="text"
						name="authorName"
						id="authorName"
						defaultValue={props.searchParams.authorName || undefined}
					/>
				</div>
				<div>
					<label htmlFor="publisherName">PublisherName: </label>
					<input
						type="text"
						name="publisherName"
						id="publisherName"
						defaultValue={props.searchParams.publisherName || undefined}
					/>
				</div>
				<div>
					<label htmlFor="order">Order: </label>
					<select name="order" id="order">
						<option value="-published_at">出版日新しい順</option>
						<option value="published_at">出版日古い順</option>
						<option value="-price">価格高い順</option>
						<option value="price">価格安い順</option>
					</select>
				</div>
				<div>
					<button type="submit">検索</button>
				</div>
			</form>
		</>
	)
}
