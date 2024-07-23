"use client";
import { OpenAPI, Post, PostsService } from '@/lib/api'
import { getCookie } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
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
            <form method="post" ref={formRef} onSubmit={async (e) => {
                e.preventDefault()
                setError(false)
                setSuccess(false)
                const formData = new FormData(formRef.current!)
                const res = await create(formData)
                if (res) { setSuccess(true); formRef.current?.reset() }
                else setError(true)
            }}>
                <img className="mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
                <h1 className="h3 mb-3 fw-normal">
                    Create a post
                </h1>
                <p>
                    <label htmlFor="id_image">Image:</label>
                    <input type="url" name="image" maxLength={200} className="form-control" required id="id_image"/>    
                </p>
                <p>
                    <label htmlFor="id_title">Title:</label>
                    <input type="text" name="title" maxLength={80} className="form-control" required id="id_title"/>
                </p>
                
                <p>
                    <label htmlFor="id_excerpt">Description:</label>
                    <textarea name="description" rows={5} className="form-control" required id="id_excerpt"></textarea>
                </p>
                
                <p>
                    <label htmlFor="id_content">Content:</label>
                    <textarea name="content" rows={10} className="form-control" required id="id_content"></textarea>
                </p>  
                <button className="btn btn-primary w-100 py-2 mb-5" type="submit">Save</button>
                {success && <div className="alert alert-success">Post saved successfully</div>}
                {error && <div className="alert alert-danger">Something went wrong</div>}
            </form>
        </main>
    )
}

export default page