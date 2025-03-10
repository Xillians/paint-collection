import { usePaintApi } from "~/composables/paintApi";
import { CollectionPaintDetails, UpdateCollectionEntryInputBody } from "~/server/utils/openapi";

export default defineEventHandler(async (event) => {
  const session = parseCookies(event).session;
  const { paintApi, parseApiResponse, parseError } = usePaintApi(session);

  try {

    const input: UpdateCollectionEntryInputBody = await readBody(event);
    if (!input) {
      throw createError({
        status: 400,
        message: "Request body is missing"
      });
    }
    const id = event.context.params?.id;

    const response = await paintApi.collection.putCollection(Number(id), input);
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
      status: error.statusCode || 500,
      message: error.cause.message || "Internal server error"
    });
  }
});