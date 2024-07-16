import PostList from '@/components/posts/post-list'
import { Post, PostsService } from '@/lib/api'
import React from 'react'

const Posts = async () => {
    let posts:Post[] = []
    try {
        posts = await PostsService.postsList()
    } catch (error) {
        
    }
    return (
        <PostList posts={posts}/>
    )
}

export default Posts