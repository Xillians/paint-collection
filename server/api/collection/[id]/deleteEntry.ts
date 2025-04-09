import { PaintAPI } from '~/server/utils/openapi'
import { parseError, apiConfig } from '~/server/utils/paintApiHelper'

export default defineEventHandler(async (event) => {
  const token = parseCookies(event).session
  apiConfig.TOKEN = token
  const api = new PaintAPI(apiConfig)
  const id = event.context.params?.id

  try {
    const response = await api.collection.deleteCollection(Number(id))
    if (typeof response == 'string') {
      return response
    }
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
