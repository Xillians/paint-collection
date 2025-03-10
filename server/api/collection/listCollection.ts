import { usePaintApi } from "~/composables/paintApi";
import { ListPaintCollectionOutputBody } from "~/server/utils/openapi";

export default defineEventHandler(async (event) => {
  const session = parseCookies(event).session;
  const { paintApi, parseApiResponse, parseError } = usePaintApi(session);

  try {
    const response = await paintApi.collection.getCollection()
    const parsedResponse = parseApiResponse<ListPaintCollectionOutputBody>(response);
    return parsedResponse.collection;
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