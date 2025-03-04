import { readBody } from 'h3';
import { setCookie } from 'h3';

type LoginBody = {
  username: string;
  password: string;
};

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginBody>(event);
  console.log(JSON.stringify(body));
  const userId = 4201;

  setCookie(event, 'session', userId.toString(), {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  });

  // set a cookie for client to read
  setCookie(event, 'clientSession', userId.toString(), {
    httpOnly: false,
    secure: false,
    sameSite: 'strict',
  });
});