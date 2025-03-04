export default defineEventHandler((event) => {
  if (event.node.req.url === '/api/login') {
    return;
  }
  const cookie = event.node.req.headers.cookie;
  if (!cookie!) {
    // warning: We do not have a cookie for non-login request!
    // API will not be able to authenticate the user
    return;
  }
  const sessionCookie = cookie.split(';').find(c => c.trim().startsWith('session='));
  if (!sessionCookie) {
    // warning: We do not have a session cookie for non-login request!
    // API will not be able to authenticate the user
    return;
  }
  const session = sessionCookie.split('=')[1];
  event.context.auth = {
    session
  };
});