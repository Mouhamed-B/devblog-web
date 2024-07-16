"use client";
import { OpenAPI } from "@/lib/api"
import { useRef } from "react"
import { useRouter } from "next/navigation";

async function register(formData: FormData) {
    try {
      const res = await fetch(OpenAPI.BASE+'/api/auth/register',
        {
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method:"POST",
            body:JSON.stringify({
                username:formData.get('username') as string,
                first_name:formData.get('first_name') as string,
                last_name:formData.get('last_name') as string,
                email:formData.get('email') as string,
                password:formData.get('password') as string,
            })
        } 
      )
      return res.status === 201
    } catch (error:any) {
      return false
    }
}

export default function RegisterForm(){
    const formRef = useRef<HTMLFormElement>(null)
    const router = useRouter()
    return (
      <main className="form-signin col-8 col-md-6 col-lg-3  m-auto">
        <form method="post"   ref={formRef} onSubmit={async e => {
            e.preventDefault()
            const formData = new FormData(formRef.current!)
            const res = await register(formData)
            if(res) {
                alert('Register successful !')
                setTimeout(() => {
                    router.push('/sign-in')
                }, 2000);
            }
            else alert('register failed')
        }}>
          <img className="mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
          <div className="form-floating mb-3">
            <input required type="text" className="form-control" id="floatingInput1" placeholder="First Name" name="first_name"/>
            <label htmlFor="floatingInput1">First Name</label>
          </div>
          <div className="form-floating mb-3">
            <input required type="text" className="form-control" id="floatingInput2" placeholder="Last Name" name="last_name"/>
            <label htmlFor="floatingInput2">Last Name</label>
          </div>
          <div className="form-floating mb-3">
            <input required type="text" className="form-control" id="floatingInput3" placeholder="Username" name="username"/>
            <label htmlFor="floatingInput3">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input required type="email" className="form-control" id="floatingInput4" placeholder="name@example.com" name="email"/>
            <label htmlFor="floatingInput4">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input required type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password"/>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit">Sign up</button>
        </form>
      </main>
    )
}