/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePaintInputBody } from '../models/CreatePaintInputBody';
import type { ErrorModel } from '../models/ErrorModel';
import type { ListPaintOutputBody } from '../models/ListPaintOutputBody';
import type { PaintOutputDetails } from '../models/PaintOutputDetails';
import type { UpdatePaintInputBody } from '../models/UpdatePaintInputBody';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PaintsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns ListPaintOutputBody OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public getPaints(): CancelablePromise<ListPaintOutputBody | ErrorModel> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/paints',
        });
    }
    /**
     * @param requestBody
     * @returns PaintOutputDetails OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public postPaints(
        requestBody: CreatePaintInputBody,
    ): CancelablePromise<PaintOutputDetails | ErrorModel> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/paints',
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
    public deletePaints(
        id: number,
    ): CancelablePromise<string | ErrorModel> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/paints/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns PaintOutputDetails OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public getPaints1(
        id: number,
    ): CancelablePromise<PaintOutputDetails | ErrorModel> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/paints/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns PaintOutputDetails OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public putPaints(
        id: number,
        requestBody: UpdatePaintInputBody,
    ): CancelablePromise<PaintOutputDetails | ErrorModel> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/paints/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
