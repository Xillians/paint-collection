import { parseApiResponse, parseError, apiConfig } from '~/server/utils/paintApiHelper';
import { CollectionPaintDetails, PaintAPI, UpdateCollectionEntryInputBody } from "~/server/utils/openapi";

export default defineEventHandler(async (event) => {
  const token = parseCookies(event).session;
  apiConfig.TOKEN = token;
  const api = new PaintAPI(apiConfig);

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

    const response = await api.collection.putCollection(Number(id), input);
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