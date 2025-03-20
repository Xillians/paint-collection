import { parseApiResponse, parseError, apiConfig } from '~/server/utils/paintApiHelper';
import { ListPaintCollectionOutputBody, PaintAPI } from "~/server/utils/openapi";

export default defineEventHandler(async (event) => {
  const token = parseCookies(event).session;
  apiConfig.TOKEN = token;
  const api = new PaintAPI(apiConfig);

  try {
    const response = await api.collection.getCollection()
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
      status: error.statusCode || 500,
      message: error.cause.message || "Internal server error"
    });
  }
});