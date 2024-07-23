"use client";
import { OpenAPI, PostsService } from '@/lib/api'
import { getCookie } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

const PostActions = ({postId}:{postId:number}) => {
    const router = useRouter()
    return (
        <>
            <form className="me-3" onSubmit={async (e) => {
            e.preventDefault()
            OpenAPI.TOKEN = getCookie('auth-token')
            try {
                await PostsService.postsDestroy(postId)
                router.push('/posts/my-posts')
            } catch (error) {
                console.log(error)
                alert('something wrong happened')
            }
            }}>
            <button type="submit" className="btn btn-danger">Delete</button>
            </form>
            <Link href={`${postId}/update`} className="btn btn-primary">
            Edit
            </Link>
        </>
    )
}

export default PostActions