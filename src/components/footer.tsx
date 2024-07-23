import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
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
  )
}

export default Footer