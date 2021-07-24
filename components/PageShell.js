import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'

const PageShell = ({ name, description, children }) => {
  const title = `nazrulhisham - ${name}`

  return (
    <>
      <Head>
        <title>{title}</title>
        {/* TODO: SEO */}
        {/* TODO: The Open Graph protocol */}
        <meta name="description" content={description ? description : name} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header name={name} />

      <main className="py-5">
        <div className="container">
          <div>
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default PageShell