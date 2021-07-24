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
      <header className="py-3 bg-light bg-gradient">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <Link href="/">
              <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <Image src={logo} width={80} height={80} alt="Naz's blog logo" />
                <span className="gf-bangers-2x"><span className="text-warning">Naz</span>rul Hisham</span>
              </a>
            </Link>
            <ul className="nav nav-pills">
              {/* TODO: Theme ligt / dark mode */}
              <li className="nav-item">
                <Link href="/coming-soon">
                  <a className="btn nav-link text-dark">
                    <i className="bi bi-moon-stars d-block mx-auto mb-1 fs-4" />
                    <small>Mode</small>
                  </a>
                </Link>
              </li>
              {/* TODO: RSS Feed component */}
              <li className="nav-item">
                <Link href="/coming-soon">
                  <a className="btn nav-link text-dark">
                    <i className="bi bi-rss d-block mx-auto mb-1 fs-4" />
                    <small>RSS</small>
                  </a>
                </Link>
              </li>
              {/* TODO: Treat me coffea component */}
              <li className="nav-item">
                <Link href="/coming-soon">
                  <a className="btn nav-link text-dark">
                    <i className="bi bi-cup-straw d-block mx-auto mb-1 fs-4" />
                    <small>😝</small>
                  </a>
                </Link>
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
                      <a className={`nav-link${isBlog ? " active" : ""}`}><small>Blog</small></a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/about">
                      <a className={`nav-link${isAbout ? " active" : ""}`}><small>About</small></a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/portfolio">
                      <a className={`nav-link${isPortfolio ? " active" : ""}`}><small>Portfolio</small></a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/">
                      <a className={`nav-link${isHome ? " active" : ""}`}><small>Home</small></a>
                    </Link>
                  </li>
                  {/* TODO: Misc Page */}
                  <li className="nav-item">
                    <Link href="/misc">
                      <a className="nav-link disabled"><small>Misc</small></a>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* TODO: Search Component */}
              <form className="d-flex">
                <input className="form-control form-control-sm me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-secondary btn-sm" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header