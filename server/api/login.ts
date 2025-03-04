import { readBody } from 'h3';
import { setCookie } from 'h3';
import { useAuthState } from '~/composables/useAuthState';

type LoginBody = {
  username: string;
  password: string;
};

export default defineEventHandler(async (event) => {
  const { isLoggedIn } = useAuthState();
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
  isLoggedIn.value = true;
});