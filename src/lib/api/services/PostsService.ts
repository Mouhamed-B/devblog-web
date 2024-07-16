/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatchedPost } from '../models/PatchedPost';
import type { Post } from '../models/Post';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PostsService {
    /**
     * API endpoints that to manage posts.
     * @returns Post
     * @throws ApiError
     */
    public static postsList(): CancelablePromise<Array<Post>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/posts/',
        });
    }
    /**
     * API endpoints that to manage posts.
     * @param requestBody
     * @returns Post
     * @throws ApiError
     */
    public static postsCreate(
        requestBody: Post,
    ): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/posts/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * API endpoints that to manage posts.
     * @param id A unique integer value identifying this post.
     * @returns Post
     * @throws ApiError
     */
    public static postsRetrieve(
        id: number,
    ): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/posts/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * API endpoints that to manage posts.
     * @param id A unique integer value identifying this post.
     * @param requestBody
     * @returns Post
     * @throws ApiError
     */
    public static postsUpdate(
        id: number,
        requestBody: Post,
    ): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/posts/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * API endpoints that to manage posts.
     * @param id A unique integer value identifying this post.
     * @param requestBody
     * @returns Post
     * @throws ApiError
     */
    public static postsPartialUpdate(
        id: number,
        requestBody?: PatchedPost,
    ): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/posts/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * API endpoints that to manage posts.
     * @param id A unique integer value identifying this post.
     * @returns void
     * @throws ApiError
     */
    public static postsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/posts/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
