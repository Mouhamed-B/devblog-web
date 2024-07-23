"use client";
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation";
import { Suspense, useRef, useState } from "react"

async function authenticate(formData: FormData) {
    try {
      await signIn('credentials', {
        redirect:true, callbackUrl:'/',
        username:formData.get('username'),
        password:formData.get('password'),
      })
    } catch (error:any) {
      if (error) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.'
          default:
            return 'Something went wrong.'
        }
      }
      return 'Something went wrong on our end'
    }
}

export default function LoginForm(){

    const formRef = useRef<HTMLFormElement>(null)

    return (
      <main className="form-signin col-8 col-md-6 col-lg-3 m-auto">
        <form method="post" ref={formRef} onSubmit={async e => {
            e.preventDefault()
            const formData = new FormData(formRef.current!)
            const res = await authenticate(formData)
        }}>
          <img className="mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" name="username" id="floatingInput" placeholder="Username"/>
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" name="password" id="floatingPassword" placeholder="Password"/>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="btn btn-primary w-100 py-2 mb-3" type="submit">Sign in</button>
          <Suspense>
            <FormErrors/>
          </Suspense>
        </form>
      </main>
    )
}

function FormErrors() {
    const searchParams = useSearchParams()
    return searchParams.get('error') ==='CredentialsSignin' ? <div className="alert alert-danger">Account not Found</div> : null
}