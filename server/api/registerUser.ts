import { readBody } from 'h3';
import { setCookie } from 'h3';
import { usePaintApi } from '~/composables/paintApi';
import { LoginOutputBody, RegisterUserInputBody, Users } from '../utils/openapi';
import { differenceInSeconds, parseISO } from 'date-fns';
import { jwtDecode } from 'jwt-decode';

export type RegisterBody = {
  credential: string;
};

export default defineEventHandler(async (event) => {
  const body = await readBody<RegisterBody>(event);
  const cookies = parseCookies(event);
  const token = cookies.session;
  const { paintApi, parseApiResponse, parseError } = usePaintApi(token);

  if (!body.credential) {
    throw createError({
      status: 400,
      message: "Client ID is required"
    });
  }

  // use jwt-decode to read the sub of the jwt that is the user id
  const decodedToken = jwtDecode(body.credential);
  const userId = decodedToken.sub;
  if (!userId) {
    throw createError({
      status: 400,
      message: "Invalid token"
    });
  }
  const requestBody: RegisterUserInputBody = {
    user_id: userId
  };

  try {
    const response = await paintApi.users.postRegister(requestBody);
    const parsedResponse = parseApiResponse<Users>(response);
    const { google_user_id } = parsedResponse;

    const loginResponse = await paintApi.users.getLogin(google_user_id);
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