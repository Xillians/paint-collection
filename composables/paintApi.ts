import { PaintAPI, type OpenAPIConfig } from "~/server/utils/openapi";


export function usePaintApi(token: string): PaintAPI {
  const apiConfig: Partial<OpenAPIConfig> = {
    BASE: 'https://paint-api-v2.fly.dev',
    VERSION: '0.1.0',
    TOKEN: token,
  }
  const paintApi = new PaintAPI(apiConfig);
  return paintApi;
}