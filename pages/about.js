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

const AboutPage = () => {
  const name = "About"
  let description = "All about Nazrul Hisham, "
  description += "both personally and professionally. "
  
  return (
    <PageShell name={name} description={description}>
      <About />
    </PageShell>
  )
}

export default AboutPage