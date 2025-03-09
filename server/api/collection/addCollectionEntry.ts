import { usePaintApi } from "~/composables/paintApi";
import { AddToCollectionInputBody, CollectionPaintDetails } from "../../utils/openapi";

export default defineEventHandler(async (event) => {
  const session = parseCookies(event).session;
  const { paintApi, parseApiResponse, parseError } = usePaintApi(session);


  try {
    const body: AddToCollectionInputBody = await readBody(event);
    const response = await paintApi.collection.postCollection(body);
    const parsedResponse = parseApiResponse<CollectionPaintDetails>(response);
    return parsedResponse;
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