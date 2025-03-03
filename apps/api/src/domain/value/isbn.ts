import { z } from 'zod';

export const isbn13Schema = z
	.string()
	.length(13, 'ISBN-13 must be exactly 13 characters')
	.regex(/^\d{13}$/, 'Invalid ISBN-13 format')
	.refine(isValidISBN13, 'Invalid ISBN-13 checksum');

/**
 * ISBN-13のチェックディジットを検証する
 */
function isValidISBN13(isbn: string) {
	const digits = isbn.split('').map(Number);
	const sum = digits.slice(0, 12).reduce((acc, digit, idx) => acc + digit * (idx % 2 === 0 ? 1 : 3), 0);
	const checkDigit = (10 - (sum % 10)) % 10;
	return checkDigit === digits[12];
}
