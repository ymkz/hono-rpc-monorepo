import type { ApiRouteType } from '@app/api';
import { hc } from 'hono/client';

export const client = hc<ApiRouteType>('http://localhost:8080');

/**
 * 値を文字列に変換する
 * 値が `undefined` や `null` や空文字の場合は `undefined` を返す
 *
 * @param value 値
 * @returns 文字列
 */
export const normalize = (value?: string | number | null) => {
	if (value === undefined || value === null || value === '') return undefined;
	return value.toString();
};
