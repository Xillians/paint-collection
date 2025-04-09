export default defineEventHandler((event) => {
  const reqUrl = event.node.req.url
  if (!reqUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    })
  }
  if (reqUrl === '/api/login' || reqUrl === '/api/registerUser' || !reqUrl.startsWith('/api')) {
    return
  }

  const cookie = parseCookies(event)
  if (!cookie!) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: no cookies found',
    })
  }

  const sessionCookie = cookie['session']
  if (!sessionCookie) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: no session cookie found',
    })
  }

  const session = sessionCookie.split('=')[1]
  event.context.auth = {
    session,
  }
})
