import { readBody } from 'h3'
import { differenceInSeconds, parseISO } from 'date-fns'
import { jwtDecode } from 'jwt-decode'
import type { LoginOutputBody } from '../utils/openapi'
import { PaintAPI } from '../utils/openapi'
import { parseApiResponse, parseError, apiConfig } from '~/server/utils/paintApiHelper'

export type LoginBody = {
  client_id: string
}

export type LoginResponse = {
  token: string
  maxAge: number
}

export default defineEventHandler<Promise<LoginResponse>>(async (event) => {
  const body = await readBody<LoginBody>(event)
  const token = parseCookies(event).session
  apiConfig.TOKEN = token
  const api = new PaintAPI(apiConfig)

  if (!body.client_id) {
    throw createError({
      status: 400,
      message: 'Client ID is required',
    })
  }

  // use jwt-decode to read the sub of the jwt that is the user id
  const decodedToken = jwtDecode(body.client_id)
  const userId = decodedToken.sub
  if (!userId) {
    throw createError({
      status: 400,
      message: 'Invalid token',
    })
  }

  try {
    const response = await api.users.getLogin(userId)
    const parsedResponse = parseApiResponse<LoginOutputBody>(response)
    const { token, expires_at } = parsedResponse

    // A hack with date-fns and non-standard date format
    const expiresAtString = expires_at.split(' ')[0] + 'T' + expires_at.split(' ')[1]

    const expiresAt = parseISO(expiresAtString)
    const now = new Date()
    const maxAge = differenceInSeconds(expiresAt, now)

    const res: LoginResponse = {
      token,
      maxAge,
    }

    return res
  }
  catch (error) {
    const apiError = parseError(error)
    if (apiError) {
      throw createError({
        status: apiError.status,
        message: apiError.detail,
      })
    }
    console.log(error)
    throw createError({
      status: 500,
      message: 'Internal server error',
    })
  }
})
