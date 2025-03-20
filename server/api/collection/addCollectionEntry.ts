import { parseApiResponse, parseError, apiConfig } from "~/server/utils/paintApiHelper";
import { AddToCollectionInputBody, CollectionPaintDetails, PaintAPI } from "../../utils/openapi";

export default defineEventHandler(async (event) => {
  const token = parseCookies(event).session;
  apiConfig.TOKEN = token;
  const api = new PaintAPI(apiConfig);


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

    const response = await api.collection.postCollection(body);
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