import { readBody } from 'h3';
import { setCookie } from 'h3';
import { usePaintApi } from '~/composables/paintApi';
import { LoginOutputBody } from '../utils/openapi';
import { differenceInSeconds, parseISO } from 'date-fns';
import { jwtDecode } from 'jwt-decode';

export type LoginBody = {
  client_id: string;
};

type JWTPayload = {
  sub: string;
  role: string;
  exp: number;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginBody>(event);
  const cookies = parseCookies(event);
  const token = cookies.session;
  const { paintApi, parseApiResponse, parseError } = usePaintApi(token);

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
    const response = await paintApi.users.getLogin(userId);
    const parsedResponse = parseApiResponse<LoginOutputBody>(response);
    const { token, expires_at } = parsedResponse;

    const decodedToken = jwtDecode<JWTPayload>(token);
    if (!decodedToken.role) {
      throw createError({
        status: 400,
        message: "Invalid token"
      });
    }

    // A hack with date-fns and non-standard date format
    const expiresAtString = expires_at.split(' ')[0] + 'T' + expires_at.split(' ')[1];

    const expiresAt = parseISO(expiresAtString);
    const now = new Date();
    const maxAge = differenceInSeconds(expiresAt, now);

    setCookie(event, 'session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: maxAge
    });

    // set a cookie for client to read
    setCookie(event, 'clientSession', token, {
      httpOnly: false,
      secure: false,
      sameSite: 'strict',
      maxAge: maxAge
    });
    return {
      body: {
        message: "Login successful",
        role: decodedToken.role
      }
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