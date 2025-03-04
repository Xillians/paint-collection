import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(JSON.stringify(body));
  return {
    body: JSON.stringify(body)
  }
});