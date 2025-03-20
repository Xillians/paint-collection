import { parseApiResponse, parseError, apiConfig } from '~/server/utils/paintApiHelper';
import { ListPaintOutputBody, PaintAPI } from "../utils/openapi";

export default defineEventHandler(async (event) => {
  const token = parseCookies(event).session;
  apiConfig.TOKEN = token;
  const api = new PaintAPI(apiConfig);

  try {
    const response = await api.paints.getPaints();
    const parsedResponse = parseApiResponse<ListPaintOutputBody>(response);
    return parsedResponse.paints;
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