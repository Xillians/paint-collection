import { PaintAPI, type OpenAPIConfig } from "~/server/utils/openapi";
import { type ErrorModel } from "~/server/utils/openapi";


export function usePaintApi(token: string) {
  const apiConfig: Partial<OpenAPIConfig> = {
    BASE: 'https://paint-api-v2.fly.dev',
    VERSION: '0.1.0',
    TOKEN: token,
  }
  const paintApi = new PaintAPI(apiConfig);

  // This function is used to parse the response from the API
  // and return the data in the correct type.
  function parseApiResponse<T>(response: any): T {
    const schemaValue = "https://paint-api-v2.fly.dev/schemas/";
    if (
      typeof response === 'object'
      && response !== null
      && "$schema" in response
      && (response as any).$schema.startsWith(schemaValue)
    ) {
      const apiResponse = response as T;
      return apiResponse;
    }
    throw new Error('Unknown response');
  }

  function parseError(err: unknown): ErrorModel | null {
    const schemaValue = "https://paint-api-v2.fly.dev/schemas/ErrorModel.json";
    if (
      typeof err === 'object'
      && err !== null
      && "$schema" in err
      && (err as any).$schema === schemaValue
    ) {
      const error = err as ErrorModel;
      return error;
    }
    return null;
  }

  return {
    paintApi,
    parseError,
    parseApiResponse,
  };
}