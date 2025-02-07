import { beforeEach, describe, expect, test, vi } from 'vitest'
import { app } from '../../../routes'

describe('UP', () => {
	test('healthz', async () => {
		const response = await app.request('/healthz', { method: 'GET' })

		expect(response.status).toBe(200)
		expect(await response.json()).toStrictEqual({ status: 'UP' })
	})
})

describe('DOWN', () => {
	beforeEach(() => {
		vi.stubEnv('HEALTHCHECK', 'DOWN')
	})

	test('healthz', async () => {
		const response = await app.request('/healthz', { method: 'GET' })

		expect(response.status).toBe(503)
		expect(await response.json()).toStrictEqual({ status: 'DOWN' })
	})
})
