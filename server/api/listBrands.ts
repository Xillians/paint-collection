import { parseApiResponse, parseError, apiConfig } from '~/server/utils/paintApiHelper';
import { ListBrandOutputBody, PaintAPI } from "../utils/openapi";

export default defineEventHandler(async (event) => {
  const token = parseCookies(event).session;
  apiConfig.TOKEN = token;
  const api = new PaintAPI(apiConfig);

  try {
    const response = await api.paintBrands.getPaintBrands()
    const parsedResponse = parseApiResponse<ListBrandOutputBody>(response);
    return parsedResponse.brands;
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