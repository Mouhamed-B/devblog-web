"use client";
import PostForm from '@/components/posts/post-form'
import { OpenAPI, Post, PostsService } from '@/lib/api'
import { getCookie } from '@/lib/utils'
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

async function update(post:Post, formData: FormData) {
    const token = getCookie('auth-token')
    OpenAPI.TOKEN = token
    try {
      const res = await PostsService.postsUpdate(post.id!,{
        ...post,
        title:formData.get('title') as string,
        image:formData.get('image') as string,
        description:formData.get('description') as string,
        content:formData.get('content') as string
      })
      return true
    } catch (error:any) {
    }
    return false

}

const page = () => {

    const formRef = useRef<HTMLFormElement>(null)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const { id }:{id:string} = useParams()

    const [post, setPost] = useState<Post|null>(null)
    
    useEffect(() => {
      PostsService.postsRetrieve(parseInt(id)).then(setPost)
    }, [id])

    return (
        <main className="col-8 col-md-6 col-lg-4 m-auto">
            <img className="mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
            <h1 className="h3 mb-3 fw-normal">
                Update a post
            </h1>
            {
              post ? 
                <PostForm initialValues={post} ref={formRef} onSubmit={
                  async (e) => {
                      e.preventDefault()
                      setError(false)
                      setSuccess(false)
                      const formData = new FormData(formRef.current!)
                      const res = await update(post,formData)
                      if (res) setSuccess(true)
                      else setError(true)
                  }
                }/>
              :
                <h2>Loading Post...</h2>
            }
            {success && <div className="alert alert-success">Post saved successfully</div>}
            {error && <div className="alert alert-danger">Something went wrong</div>}
        </main>
    )
}

export default page