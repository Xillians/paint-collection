/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateBrandInputBody } from '../models/CreateBrandInputBody';
import type { ErrorModel } from '../models/ErrorModel';
import type { PaintBrands } from '../models/PaintBrands';
import type { UpdateBrandInputBody } from '../models/UpdateBrandInputBody';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PaintBrandsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns any[] OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public getPaintBrands(): CancelablePromise<any[] | null | ErrorModel> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/paint-brands',
        });
    }
    /**
     * @param requestBody
     * @returns PaintBrands OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public postPaintBrands(
        requestBody: CreateBrandInputBody,
    ): CancelablePromise<PaintBrands | ErrorModel> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/paint-brands',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns string OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public deletePaintBrands(
        id: number,
    ): CancelablePromise<string | ErrorModel> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/paint-brands/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns PaintBrands OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public getPaintBrands1(
        id: number,
    ): CancelablePromise<PaintBrands | ErrorModel> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/paint-brands/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns PaintBrands OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public putPaintBrands(
        id: number,
        requestBody: UpdateBrandInputBody,
    ): CancelablePromise<PaintBrands | ErrorModel> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/paint-brands/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
