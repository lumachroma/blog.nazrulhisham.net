import PageShell from '../components/PageShell'

const Portfolio = () => {
  return (
    <>
      {/* TODO: Portfolio Page */}
      <div className="py-2">
        <h1 className="display-4">Portfolio</h1>
        <p className="lead">Some descriptional paragraphs here. Some more descriptional paragraphs here.</p>
      </div>
    </>
  )
}

const PortfolioPage = () => {
  const name = "Portfolio"
  let description = "Portfolio od Nazrul Hisham, "
  description += "his achievements, contributions and experiences. "

  return (
    <PageShell name={name} description={description}>
      <Portfolio />
    </PageShell>
  )
}

export default PortfolioPage