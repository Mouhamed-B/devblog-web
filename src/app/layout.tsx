import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerAuthSession } from "@/lib/auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";
import UserNav from "@/components/nav/user-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog",
  description: "Simple blog",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerAuthSession()
  return (
    <html lang="en" className="h-100">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
      <body className={inter.className+" d-flex flex-column h-100 pb-0"}> 
        
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
                      <li><Link href="posts/create" className="nav-link px-2">Create Post</Link></li>    
                      <li><Link href="posts/my-posts" className="nav-link px-2">My Posts</Link></li>
                    </>
                }
              </ul>

              <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                <input type="search" className="form-control" placeholder="Search..." aria-label="Search"/>
              </form>
              <UserNav session={session!} />
              
            </div>
          </div>
        </header>
        
        {children}

        <footer className="d-flex flex-wrap justify-content-between mt-auto align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <Link href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
              <svg className="bi" width="30" height="24"><use xlinkHref="#bootstrap"></use></svg>
            </Link>
            <span className="mb-3 mb-md-0 text-body-secondary">© 2024 Md-Bm</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3"><Link className="text-body-secondary" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#twitter"></use></svg></Link></li>
            <li className="ms-3"><Link className="text-body-secondary" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#instagram"></use></svg></Link></li>
            <li className="ms-3"><Link className="text-body-secondary" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#facepost"></use></svg></Link></li>
          </ul>
        </footer>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}