import { readBody } from 'h3'
import { differenceInSeconds, parseISO } from 'date-fns'
import { jwtDecode } from 'jwt-decode'
import type { LoginOutputBody, RegisterUserInputBody, Users } from '../utils/openapi'
import { PaintAPI } from '../utils/openapi'
import type { LoginResponse } from './login'
import { parseApiResponse, parseError, apiConfig } from '~/server/utils/paintApiHelper'

export type RegisterBody = {
  credential: string
}
type jwtClaims = {
  sub: string
  email: string
}

export default defineEventHandler<Promise<LoginResponse>>(async (event) => {
  const body = await readBody<RegisterBody>(event)
  const token = parseCookies(event).session
  apiConfig.TOKEN = token
  const api = new PaintAPI(apiConfig)

  if (!body.credential) {
    throw createError({
      status: 400,
      message: 'Client ID is required',
    })
  }

  // use jwt-decode to read the sub of the jwt that is the user id
  const decodedToken = jwtDecode<jwtClaims>(body.credential)
  const userId = decodedToken.sub
  if (!userId) {
    throw createError({
      status: 400,
      message: 'Invalid token',
    })
  }
  const requestBody: RegisterUserInputBody = {
    user_id: userId,
    email: decodedToken.email,
  }

  try {
    const response = await api.users.postRegister(requestBody)
    const parsedResponse = parseApiResponse<Users>(response)
    const { google_user_id } = parsedResponse

    const loginResponse = await api.users.getLogin(google_user_id)
    const parsedRespone = parseApiResponse<LoginOutputBody>(loginResponse)
    const { token, expires_at } = parsedRespone

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
