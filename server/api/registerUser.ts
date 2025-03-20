import { readBody } from 'h3';
import { parseApiResponse, parseError, apiConfig } from '~/server/utils/paintApiHelper';
import { LoginOutputBody, PaintAPI, RegisterUserInputBody, Users } from '../utils/openapi';
import { differenceInSeconds, parseISO } from 'date-fns';
import { jwtDecode } from 'jwt-decode';

export type RegisterBody = {
  credential: string;
};
type jwtClaims = {
  sub: string;
  email: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<RegisterBody>(event);
  const token = parseCookies(event).session;
  apiConfig.TOKEN = token;
  const api = new PaintAPI(apiConfig);

  if (!body.credential) {
    throw createError({
      status: 400,
      message: "Client ID is required"
    });
  }

  // use jwt-decode to read the sub of the jwt that is the user id
  const decodedToken = jwtDecode<jwtClaims>(body.credential);
  const userId = decodedToken.sub;
  if (!userId) {
    throw createError({
      status: 400,
      message: "Invalid token"
    });
  }
  const requestBody: RegisterUserInputBody = {
    user_id: userId,
    email: decodedToken.email,
  };

  try {
    const response = await api.users.postRegister(requestBody);
    const parsedResponse = parseApiResponse<Users>(response);
    const { google_user_id } = parsedResponse;

    const loginResponse = await api.users.getLogin(google_user_id);
    const parsedRespone = parseApiResponse<LoginOutputBody>(loginResponse);
    const { token, expires_at } = parsedRespone;

    // A hack with date-fns and non-standard date format
    const expiresAtString = expires_at.split(' ')[0] + 'T' + expires_at.split(' ')[1];

    const expiresAt = parseISO(expiresAtString);
    const now = new Date();
    const maxAge = differenceInSeconds(expiresAt, now);
    return {
      token,
      maxAge
    }
  } catch (error: any) {
    const apiError = parseError(error);
    if (apiError) {
      throw createError({
        status: apiError.status,
        message: apiError.detail
      });
    }
    console.log(error);
    throw createError({
      status: error.statusCode || 500,
      message: error.cause.message || "Internal server error"
    });
  }
});