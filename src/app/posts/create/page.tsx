"use client";
import PostForm from '@/components/posts/post-form'
import { OpenAPI, PostsService } from '@/lib/api'
import { getCookie } from '@/lib/utils'
import React, { useRef, useState } from 'react'

async function create(formData: FormData) {
    const token = getCookie('auth-token')
    OpenAPI.TOKEN = token
    try {
      const res = await PostsService.postsCreate({
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
    
    return (
        <main className="col-8 col-md-6 col-lg-4 m-auto">
            <img className="mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
            <h1 className="h3 mb-3 fw-normal">
                Create a post
            </h1>
            <PostForm ref={formRef} onSubmit={
                async (e) => {
                    e.preventDefault()
                    setError(false)
                    setSuccess(false)
                    const formData = new FormData(formRef.current!)
                    const res = await create(formData)
                    if (res) { setSuccess(true); formRef.current?.reset() }
                    else setError(true)
                }
            }/>
            {success && <div className="alert alert-success">Post saved successfully</div>}
            {error && <div className="alert alert-danger">Something went wrong</div>}
        </main>
    )
}

export default page