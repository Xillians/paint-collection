import { usePaintApi } from "~/composables/paintApi";
import { AddToCollectionInputBody, CollectionPaintDetails } from "../../utils/openapi";

export default defineEventHandler(async (event) => {
  const session = parseCookies(event).session;
  const { paintApi, parseApiResponse, parseError } = usePaintApi(session);


  try {
    const body: AddToCollectionInputBody = await readBody(event);
    if (!body.paint_id) {
      throw createError({
        status: 400,
        message: "paint_id is required"
      });
    }
    if (!body.quantity) {
      throw createError({
        status: 400,
        message: "quantity is required"
      });
    }
    if (body.quantity < 1) {
      throw createError({
        status: 400,
        message: "quantity must be greater than 0"
      });
    }

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
      status: error.statusCode || 500,
      message: error.cause.message || "Internal server error"
    });
  }
});