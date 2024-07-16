"use client";
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const UserNav = ({session}:{session:any}) => {
  return (
    session?.user ?
        <div className="dropdown text-end">
          <Link href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <span>{
              //@ts-ignore
              session.user?.username
            }</span>
          </Link>
          <ul className="dropdown-menu text-small">
            <li><Link className="dropdown-item" href="">
              <button onClick={() => signOut()} type="submit" className="btn btn-default">Sign Out</button>  
            </Link></li>
          </ul>
        </div>
        :
        <div className="d-flex gap-2">
          <Link href="sign-in" className="btn btn-primary">Sign in</Link>
          <Link href="sign-up" className="btn btn-outline-primary">Sign up</Link>
        </div>
    
  )
}

export default UserNav