import { usePaintApi } from "~/composables/paintApi";
import { CollectionPaintDetails, UpdateCollectionEntryInputBody } from "~/server/utils/openapi";

export default defineEventHandler(async (event) => {
  const session = parseCookies(event).session;
  const { paintApi, parseApiResponse, parseError } = usePaintApi(session);

  try {

    const requestBody = event._requestBody as string | undefined;
    if (!requestBody) {
      throw createError({
        status: 400,
        message: "Request body is missing"
      });
    }
    const id = event.context.params?.id;

    const input: UpdateCollectionEntryInputBody = JSON.parse(requestBody);
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
      status: 500,
      message: error.message
    });
  }
});