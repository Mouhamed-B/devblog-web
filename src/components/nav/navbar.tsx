import Link from 'next/link'
import React from 'react'
import Head from "next/head";
import UserNav from "@/components/nav/user-nav";
import { getServerAuthSession } from "@/lib/auth";
import { signOut } from "next-auth/react";

const navbar = async () => {
    const session = await getServerAuthSession()

    return (
        <header className="p-3 mb-3 border-bottom">
        <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <Link href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                    <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"></use></svg>
                </Link>
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><Link href="/" className="nav-link px-2">All Posts</Link></li>
                    {session?.user &&
                        <>
                        <li><Link href="/posts/create" className="nav-link px-2">Create Post</Link></li>    
                        <li><Link href="/posts/my-posts" className="nav-link px-2">My Posts</Link></li>
                        </>
                    }
                </ul>
                <UserNav session={session!} />
            </div>
        </div>
        </header>
    )
}

export default navbar