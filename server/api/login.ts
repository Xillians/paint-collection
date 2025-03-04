import { readBody } from 'h3';

type LoginBody = {
  username: string;
  password: string;
};

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginBody>(event);
  console.log(JSON.stringify(body));
  return {
    body: {
      username: body.username,
      password: body.password
    }
  }
});