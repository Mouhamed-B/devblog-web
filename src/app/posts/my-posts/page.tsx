import PostList from '@/components/posts/post-list'
import { AuthorsService, OpenAPI, Post, PostsService } from '@/lib/api'
import { getServerAuthSession } from '@/lib/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const Posts = async () => {
    const session = await getServerAuthSession()
    if (!session) redirect('/sign-in')
    let posts:Post[] = []
    try {
        OpenAPI.TOKEN = cookies().get('auth-token')?.value
        posts = await AuthorsService.authorsPostsList()
    } catch (error) {
        console.log(error);
    }
    return (
        <PostList posts={posts}/>
    )
}

export default Posts