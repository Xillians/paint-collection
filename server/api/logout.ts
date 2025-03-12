export default defineEventHandler(async (event) => {
  deleteCookie(event, 'session');
  deleteCookie(event, 'clientSession');
  deleteCookie(event, 'role');
  setResponseStatus(event, 204);
  return;
});