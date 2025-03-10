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
    if (!input.paint_id) {
      throw createError({
        status: 400,
        message: "Paint ID is missing"
      });
    }
    if (!input.quantity) {
      throw createError({
        status: 400,
        message: "Amount is missing"
      });
    }
    if (input.quantity < 0) {
      throw createError({
        status: 400,
        message: "Amount must be greater than or equal to 0"
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