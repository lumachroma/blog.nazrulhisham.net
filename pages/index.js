import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import hello1 from '../public/hmmm1.png'
import hello2 from '../public/hmmm2.png'
import PageShell from '../components/PageShell'
import MostHitPost from '../components/MostHitPost'
import MostLikePost from '../components/MostLikePost'

const Home = () => {
  const [helloImage, setHelloImage] = useState(hello1)

  const tempIcons = [
    'bi-cpu-fill',
    'bi-calendar3',
    'bi-box-seam',
    'bi-bug-fill',
    'bi-window-sidebar',
    'bi-person-badge',
  ]

  const hanldeToggleHelloImage = () => {
    if (helloImage === hello1) setHelloImage(hello2)
    else setHelloImage(hello1)
  }

  return (
    <>
      <div className="px-3 py-5 text-center">
        <Image src={helloImage} width={120} height={120} onClick={hanldeToggleHelloImage} alt="Naz is thinking and working" />
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

      <div className="row">
        <div className="col-md-6">
          <div className="py-2">
            <h2>Populars</h2>
            <p className="fw-light text-muted">Top hit posts</p>
            <MostHitPost />
          </div>
        </div>
        <div className="col-md-6">
          <div className="py-2">
            <h2>Favourites</h2>
            <p className="fw-light text-muted">Top like posts</p>
            <MostLikePost />
          </div>
        </div>
      </div>

      {/* TODO: Courses &amp; Tutorials */}
      <div className="py-2">
        <h2>Courses &amp; Tutorials</h2>
        <p className="fw-lighter lh-sm bg-light m-2 p-2">Coming soon...</p>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {tempIcons.map((icon, i) => (
            <div key={i} className="col">
              <div className="card bg-light border-0 rounded-3">
                <div className="card-body">
                  <div className="d-flex align-items-start">
                    <i className={`bi ${icon} flex-shrink-0 me-3 fs-3 text-primary`} />
                    <div>
                      <h3 className="fw-bold mb-0">Course title</h3>
                      <p>Some descriptional paragraphs here.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {[...Array(4)].map((x, i) => (
            <div key={i} className="col">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Course title</h3>
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

const HomePage = () => {
  const name = "Home"
  let description = "Nazrul Hisham's blog "
  description += "where he wish he could share his experiences and musings "
  description += "by creating helpful and useful contents for software developers, programmers and techies. "
  description += "Nazrul Hisham is a solution architect, tech lead, software engineer and programmer. "
  description += "In his free time, he code. Mostly web and mobile applications "
  description += "experimenting with latest, trending and cool cutting-edge technologies that he could lay his hands on. "
  
  return (
    <PageShell name={name} description={description}>
      <Home />
    </PageShell>
  )
}

export default HomePage