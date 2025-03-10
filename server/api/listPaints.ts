import { usePaintApi } from "~/composables/paintApi";
import { ListPaintOutputBody } from "../utils/openapi";

export default defineEventHandler(async (event) => {
  const session = parseCookies(event).session;
  const { paintApi, parseApiResponse, parseError } = usePaintApi(session);

  try {
    const response = await paintApi.paints.getPaints();
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