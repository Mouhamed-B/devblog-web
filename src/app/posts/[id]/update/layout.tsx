import { getServerAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function PostUpdateLayout({
    children,
}:  Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerAuthSession()
    if (!session) redirect('/sign-in')
        
    return children
}