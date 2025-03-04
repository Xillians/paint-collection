import { PaintAPI, type OpenAPIConfig } from "~/server/utils/openapi";

function usePaintApi(): PaintAPI {
  const apiConfig: Partial<OpenAPIConfig> = {
    BASE: 'https://api.example.com',
    VERSION: '0.1.0',
  }
  const paintApi = new PaintAPI(apiConfig);
  return paintApi;
}

const paintApi = usePaintApi();
export default paintApi;