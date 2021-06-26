import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/me.png'

const Footer = () => {
  return (
    <footer className="mt-auto py-3 bg-light border-top">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md">
            <Link href="/">
              <a className="d-flex text-decoration-none">
                <Image src={logo} width={30} height={30} />
                <span className="gf-bangers">Nazrul Hisham</span>
              </a>
            </Link>
            &nbsp;
            <small>&copy; 2008–{(new Date()).getFullYear()}.</small>
            &nbsp;
            <small>All Rights Reserved.</small>
          </div>
          <div className="col-6 col-md">
            <ul className="list-unstyled text-small">
              <li><Link href="/"><a className="link-secondary text-decoration-none">Home</a></Link></li>
              <li><Link href="/about"><a className="link-secondary text-decoration-none">About</a></Link></li>
              <li><Link href="/portfolio"><a className="link-secondary text-decoration-none">Portfolio</a></Link></li>
              <li><Link href="#"><a className="link-secondary text-decoration-none">Misc</a></Link></li>{/* TODO: Misc Page */}
            </ul>
          </div>
          <div className="col-6 col-md">
            <ul className="list-unstyled text-small">
              <li><Link href="https://github.com/lumachroma"><a className="link-secondary text-decoration-none">GitHub</a></Link></li>
              <li><Link href="https://twitter.com/nazrulhisham_"><a className="link-secondary text-decoration-none">Twitter</a></Link></li>
              <li><Link href="https://www.linkedin.com/in/nazrul-hisham"><a className="link-secondary text-decoration-none">LinkedIn</a></Link></li>
              <li><Link href="#"><a className="link-secondary text-decoration-none">Contact</a></Link></li>{/* TODO: Contact Page */}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer