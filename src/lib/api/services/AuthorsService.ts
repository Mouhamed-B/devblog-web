/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Post } from '../models/Post';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthorsService {
    /**
     * API endpoint that list author post.
     * @returns Post
     * @throws ApiError
     */
    public static authorsPostsList(): CancelablePromise<Array<Post>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/authors/posts',
        });
    }
}
