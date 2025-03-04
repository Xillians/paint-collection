import { readBody } from 'h3';
import { setCookie } from 'h3';
import { usePaintApi } from '~/composables/paintApi';
import { ErrorModel } from '../utils/openapi';
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

  try {
    const userId = 4201;
    const paintApi = usePaintApi(token);
    const response = await paintApi.users.getLogin(userId);
    if (!('token' in response)) {
      response satisfies ErrorModel;
      throw createError({
        status: response.status,
        message: response.detail
      })
    }

    // A hack with date-fns and non-standard date format
    const expiresAtString = response.expires_at.split(' ')[0] + 'T' + response.expires_at.split(' ')[1];

    const expiresAt = parseISO(expiresAtString);
    const now = new Date();
    const maxAge = differenceInSeconds(expiresAt, now);

    setCookie(event, 'session', response.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: maxAge
    });

    // set a cookie for client to read
    setCookie(event, 'clientSession', response.token, {
      httpOnly: false,
      secure: false,
      sameSite: 'strict',
      maxAge: maxAge
    });
  } catch (error: any) {
    if ("body" in error) {
      const err = error.body as ErrorModel;
      throw createError({
        status: err.status,
        message: err.detail
      });
    }
    throw createError({
      status: 500,
      message: 'Internal Server Error'
    });
  }
});