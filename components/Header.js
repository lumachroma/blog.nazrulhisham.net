import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/me.png'

const Header = ({ name }) => {
  const isHome = name === "Home"
  const isBlog = name === "Blog"
  const isAbout = name === "About"
  const isPortfolio = name === "Portfolio"

  return (
    <>
      <header className="py-3 bg-light">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link href="/">
              <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <Image src={logo} width={80} height={80} />
                <span className="gf-bangers-2x"><span className="gf-bangers-3x text-warning">Naz</span>rul Hisham</span>
              </a>
            </Link>
            <ul className="nav nav-pills">
              {/* TODO: Theme ligt / dark mode */}
              <li className="nav-item">
                <a className="btn nav-link text-muted">
                  <i className="bi bi-moon-stars d-block mx-auto mb-1 fs-4" />
                  <small>Mode</small>
                </a>
              </li>
              {/* TODO: RSS Feed component */}
              <li className="nav-item">
                <a className="btn nav-link text-muted">
                  <i className="bi bi-rss d-block mx-auto mb-1 fs-4" />
                  <small>RSS</small>
                </a>
              </li>
              {/* TODO: Treat me coffea component */}
              <li className="nav-item">
                <a className="btn nav-link text-muted">
                  <i className="bi bi-cup-straw d-block mx-auto mb-1 fs-4" />
                  <small>😝</small>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <nav className="sticky-xl-top">
        <div className="py-3 bg-light bg-gradient border shadow">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto">
                <ul className="nav nav-pills">
                  <li className="nav-item">
                    <Link href="/blog">
                      <a className={`nav-link${isBlog ? " active" : ""}`}>Blog</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/about">
                      <a className={`nav-link${isAbout ? " active" : ""}`}>About</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/portfolio">
                      <a className={`nav-link${isPortfolio ? " active" : ""}`}>Portfolio</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/">
                      <a className={`nav-link${isHome ? " active" : ""}`}>Home</a>
                    </Link>
                  </li>
                  {/* TODO: Misc Page */}
                  <li className="nav-item">
                    <Link href="/misc">
                      <a className="nav-link disabled">Misc</a>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* TODO: Search Component */}
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-secondary" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header