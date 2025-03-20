import { PaintAPI } from '~/server/utils/openapi';
import { parseApiResponse, parseError, apiConfig } from '~/server/utils/paintApiHelper';

export default defineEventHandler(async (event) => {
  const token = parseCookies(event).session;
  apiConfig.TOKEN = token;
  const api = new PaintAPI(apiConfig);
  const id = event.context.params?.id;

  try {
    const response = await api.collection.deleteCollection(Number(id));
    if (typeof response == 'string') {
      return response;
    }
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