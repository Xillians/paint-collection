import { usePaintApi } from "~/composables/paintApi";

export default defineEventHandler(async (event) => {
  const session = parseCookies(event).session;
  const { paintApi, parseError } = usePaintApi(session);
  const id = event.context.params?.id;

  try {
    const response = await paintApi.collection.deleteCollection(Number(id));
    if (typeof response == 'string') {
      return response;
    }
  } catch (error: any) {
    const err = parseError(error);
    if (err) {
      throw createError({
        status: err.status,
        message: err.detail
      });
    }
    throw createError({
      status: 500,
      message: error.message
    });
  }
});