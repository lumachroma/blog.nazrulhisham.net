import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import hello1 from '../public/hmmm1.png'
import hello2 from '../public/hmmm2.png'
import PageShell from '../components/PageShell'

const Home = () => {
  const [helloImage, setHelloImage] = useState(hello1)

  const hanldeToggleHelloImage = () => {
    if (helloImage === hello1) setHelloImage(hello2)
    else setHelloImage(hello1)
  }

  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <a className="btn"><Image src={helloImage} width={120} height={120} onClick={hanldeToggleHelloImage} /></a>
        <h1 className="display-5 fw-bold">Hey, I'm Naz</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            I'm a solution architect, tech lead, software engineer and programmer. {' '}
            A creator at heart. I work as a Software Developer at Sapura Digital Solutions. {' '}
            In my free time, I code. Mostly web and mobile applications, {' '}
            experimenting with latest, trending &amp; cool cutting-edge technologies that I could lay my hands on. {' '}
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link href="/blog">
              <a className="btn btn-primary btn-lg px-4 gap-3 bg-gradient shadow">Read my Blog</a>
            </Link>
            <Link href="https://github.com/lumachroma">
              <a className="btn btn-outline-secondary btn-lg px-4 bg-gradient shadow" target="_blank">Browse my GitHub</a>
            </Link>
          </div>
        </div>
      </div>

      {/* TODO: Most Popular Listings */}
      <div className="py-2">
        <h2>Most Popular</h2>
        <p className="fw-lighter lh-sm bg-light m-2 p-2">Coming soon...</p>
      </div>

      {/* TODO: Courses &amp; Tutorials */}
      <div className="py-2">
        <h2>Courses &amp; Tutorials</h2>
        <p className="fw-lighter lh-sm bg-light m-2 p-2">Coming soon...</p>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {[...Array(4)].map((x, i) => (
            <div key={i} className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Course title</h5>
                  <p className="card-text">Some descriptional paragraphs here.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const HomePage = () => (
  <PageShell name={"Home"}>
    <Home />
  </PageShell>
)

export default HomePage