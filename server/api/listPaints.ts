import type { ListPaintOutputBody } from '../utils/openapi'
import { PaintAPI } from '../utils/openapi'
import { parseApiResponse, parseError, apiConfig } from '~/server/utils/paintApiHelper'

export default defineEventHandler(async (event) => {
  const token = parseCookies(event).session
  apiConfig.TOKEN = token
  const api = new PaintAPI(apiConfig)

  try {
    const response = await api.paints.getPaints()
    const parsedResponse = parseApiResponse<ListPaintOutputBody>(response)
    return parsedResponse.paints
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
