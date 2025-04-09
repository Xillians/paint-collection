import type { OpenAPIConfig } from '~/server/utils/openapi'

export const apiConfig: Partial<OpenAPIConfig> = {
  BASE: 'https://paint-api-v2.fly.dev',
  VERSION: '0.1.0',
}

// This function is used to parse the response from the API
// and return the data in the correct type.
export function parseApiResponse<T extends Record<string, unknown>>(response: unknown): T {
  const schemaValue = 'https://paint-api-v2.fly.dev/schemas/'

  if (
    typeof response === 'object'
    && response !== null
    && '$schema' in response
    && typeof (response as { $schema: string }).$schema === 'string'
    && (response as { $schema: string }).$schema.startsWith(schemaValue)
  ) {
    return response as T
  }

  const error = parseError(response)
  if (error) {
    throw error
  }

  throw new Error('Unknown response')
}

export function parseError(err: unknown): ErrorModel | null {
  const schemaValue = 'https://paint-api-v2.fly.dev/schemas/ErrorModel.json'
  if (typeof err === 'object' && err !== null && 'body' in err) {
    const errBody = (err as { body: ErrorModel }).body
    if (errBody.$schema?.includes(schemaValue)) {
      return errBody
    }
  }
  return null
}
