/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddToCollectionInputBody } from '../models/AddToCollectionInputBody';
import type { CollectionPaintDetails } from '../models/CollectionPaintDetails';
import type { ErrorModel } from '../models/ErrorModel';
import type { ListPaintCollectionOutputBody } from '../models/ListPaintCollectionOutputBody';
import type { UpdateCollectionEntryInputBody } from '../models/UpdateCollectionEntryInputBody';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CollectionService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns ListPaintCollectionOutputBody OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public getCollection(): CancelablePromise<ListPaintCollectionOutputBody | ErrorModel> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/collection',
        });
    }
    /**
     * @param requestBody
     * @returns CollectionPaintDetails OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public postCollection(
        requestBody: AddToCollectionInputBody,
    ): CancelablePromise<CollectionPaintDetails | ErrorModel> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/collection',
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
    public deleteCollection(
        id: number,
    ): CancelablePromise<string | ErrorModel> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/collection/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns CollectionPaintDetails OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public putCollection(
        id: number,
        requestBody: UpdateCollectionEntryInputBody,
    ): CancelablePromise<CollectionPaintDetails | ErrorModel> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/collection/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
