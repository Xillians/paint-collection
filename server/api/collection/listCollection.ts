import { parseApiResponse, parseError, apiConfig } from '~/server/utils/paintApiHelper'
import type { ListPaintCollectionOutputBody } from '~/server/utils/openapi'
import { PaintAPI } from '~/server/utils/openapi'

export default defineEventHandler(async (event) => {
  const token = parseCookies(event).session
  apiConfig.TOKEN = token
  const api = new PaintAPI(apiConfig)

  try {
    const response = await api.collection.getCollection()
    const parsedResponse = parseApiResponse<ListPaintCollectionOutputBody>(response)
    return parsedResponse.collection
  }
  catch (error) {
    const err = parseError(error)
    if (err) {
      throw createError({
        status: err.status,
        message: err.detail,
      })
    }
    throw createError({
      status: 500,
      message: 'Internal server error',
    })
  }
})
