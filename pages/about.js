import PageShell from '../components/PageShell'

const About = () => {
  return (
    <>
      {/* TODO: About Page */}
      <div className="py-2">
        <h1 className="display-4">About</h1>
        <p className="lead">Some descriptional paragraphs here. Some more descriptional paragraphs here.</p>
      </div>
    </>
  )
}

const AboutPage = () => (
  <PageShell name={"About"}>
    <About />
  </PageShell>
)

export default AboutPage