import { usePaintApi } from "~/composables/paintApi";
import { ListBrandOutputBody } from "../utils/openapi";

export default defineEventHandler(async (event) => {
  const session = parseCookies(event).session;
  const { paintApi, parseApiResponse, parseError } = usePaintApi(session);

  try {
    const response = await paintApi.paintBrands.getPaintBrands()
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