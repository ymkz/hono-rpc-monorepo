import { z } from "zod";
import type { Branded } from "../../helper/types";

/**
 * ISBN-13のブランド型
 */
export type Isbn13 = Branded<string, "Isbn13">;

/**
 * ISBN-13の値オブジェクトを表現するコンパニオンオブジェクト
 */
export const Isbn13 = {
	create: (value: string): Isbn13 => {
		const isbn = isbn13Schema.parse(value);
		return isbn as unknown as Isbn13;
	},
};

/**
 * ISBN-13のZodスキーマ
 */
export const isbn13Schema = z
	.string()
	.length(13, "ISBN-13 must be exactly 13 characters")
	.regex(/^\d{13}$/, "Invalid ISBN-13 format")
	.refine(isValidISBN13, "Invalid ISBN-13 checksum")
	.transform((value) => Isbn13.create(value));

/**
 * ISBN-13のチェックディジットを検証する
 */
function isValidISBN13(isbn: string) {
	const digits = isbn.split("").map(Number);
	const sum = digits.slice(0, 12).reduce((acc, digit, idx) => acc + digit * (idx % 2 === 0 ? 1 : 3), 0);
	const checkDigit = (10 - (sum % 10)) % 10;
	return checkDigit === digits[12];
}
