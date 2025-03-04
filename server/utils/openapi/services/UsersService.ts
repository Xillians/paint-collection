/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ErrorModel } from '../models/ErrorModel';
import type { LoginOutputBody } from '../models/LoginOutputBody';
import type { RefreshTokenOutputBody } from '../models/RefreshTokenOutputBody';
import type { RegisterUserInputBody } from '../models/RegisterUserInputBody';
import type { Users } from '../models/Users';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UsersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param id
     * @returns string OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public deleteForget(
        id: number,
    ): CancelablePromise<string | ErrorModel> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/forget/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns LoginOutputBody OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public getLogin(
        id: number,
    ): CancelablePromise<LoginOutputBody | ErrorModel> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/login/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns RefreshTokenOutputBody OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public getRefresh(
        id: number,
    ): CancelablePromise<RefreshTokenOutputBody | ErrorModel> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/refresh/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param requestBody
     * @returns Users OK
     * @returns ErrorModel Error
     * @throws ApiError
     */
    public postRegister(
        requestBody: RegisterUserInputBody,
    ): CancelablePromise<Users | ErrorModel> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
