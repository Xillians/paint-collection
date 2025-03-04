export default defineEventHandler((event) => {
  const reqUrl = event.node.req.url;
  if (!reqUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    });
  }
  if (reqUrl === '/api/login' || !reqUrl.startsWith('/api')) {
    return;
  }

  const cookie = event.node.req.headers.cookie;
  if (!cookie!) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: no cookies found',
    });
  }

  const sessionCookie = cookie.split(';').find(c => c.trim().startsWith('session='));
  if (!sessionCookie) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: no session cookie found',
    });
  }

  const session = sessionCookie.split('=')[1];
  event.context.auth = {
    session
  };
  return event;
});