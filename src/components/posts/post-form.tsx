"use client";
import { Post } from '@/lib/api'
import React from 'react'

const formDefaultValues = {
  title:"",
  image:"",
  description:"",
  content:""
}

type PostFormProps = {
  initialValues?:Post,
  onSubmit: React.FormEventHandler<HTMLFormElement>,
}

const PostForm = React.forwardRef(({initialValues=formDefaultValues, onSubmit}: PostFormProps, ref:React.ForwardedRef<HTMLFormElement>) => {
    return (
        <form method="post" ref={ref} onSubmit={onSubmit}>
            <p>
                <label htmlFor="id_image">Image:</label>
                <input defaultValue={initialValues.image} type="url" name="image" maxLength={200} className="form-control" required id="id_image"/>    
            </p>
            <p>
                <label htmlFor="id_title">Title:</label>
                <input defaultValue={initialValues.title} type="text" name="title" maxLength={80} className="form-control" required id="id_title"/>
            </p>
            
            <p>
                <label htmlFor="id_excerpt">Description:</label>
                <textarea name="description" rows={5} defaultValue={initialValues.description} className="form-control" required id="id_excerpt"></textarea>
            </p>
            
            <p>
                <label htmlFor="id_content">Content:</label>
                <textarea name="content" rows={10} defaultValue={initialValues.content} className="form-control" required id="id_content"></textarea>
            </p>
            <button className="btn btn-primary w-100 py-2 mb-5" type="submit">Save</button>
        </form>
    )
}
)
export default PostForm