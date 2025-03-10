import { readBody } from 'h3';
import { setCookie } from 'h3';
import { usePaintApi } from '~/composables/paintApi';
import { LoginOutputBody } from '../utils/openapi';
import { differenceInSeconds, parseISO } from 'date-fns';

type LoginBody = {
  username: string;
  password: string;
};

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginBody>(event);
  const cookies = parseCookies(event);
  const token = cookies.session;
  console.log(JSON.stringify(body));
  const { paintApi, parseApiResponse, parseError } = usePaintApi(token);

  try {
    const userId = 4201;
    const response = await paintApi.users.getLogin(userId);
    const parsedResponse = parseApiResponse<LoginOutputBody>(response);
    const { token, expires_at } = parsedResponse;

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