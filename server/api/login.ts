import { readBody } from 'h3';
import { parseApiResponse, parseError, apiConfig } from '~/server/utils/paintApiHelper';
import { LoginOutputBody, PaintAPI } from '../utils/openapi';
import { differenceInSeconds, parseISO } from 'date-fns';
import { jwtDecode } from 'jwt-decode';

export type LoginBody = {
  client_id: string;
};

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginBody>(event);
  const token = parseCookies(event).session;
  apiConfig.TOKEN = token;
  const api = new PaintAPI(apiConfig);

  if (!body.client_id) {
    throw createError({
      status: 400,
      message: "Client ID is required"
    });
  }

  // use jwt-decode to read the sub of the jwt that is the user id
  const decodedToken = jwtDecode(body.client_id);
  const userId = decodedToken.sub;
  if (!userId) {
    throw createError({
      status: 400,
      message: "Invalid token"
    });
  }

  try {
    const response = await api.users.getLogin(userId);
    const parsedResponse = parseApiResponse<LoginOutputBody>(response);
    const { token, expires_at } = parsedResponse;

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