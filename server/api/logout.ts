export default defineEventHandler(async (event) => {
  deleteCookie(event, 'session');
  deleteCookie(event, 'clientSession');
  setResponseStatus(event, 204);
  return;
});