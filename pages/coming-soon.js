import PageShell from '../components/PageShell'

const ComingSoon = () => {
  return (
    <>
      <div className="py-3 px-3 bg-light border rounded-3">
        <h1 className="display-4">
          <i className="bi bi-cone-striped" style={{ color: "crimson" }} />{' '}
          Coming Soon
        </h1>
        {/* <h2><i className="bi bi-cone-striped" /></h2> */}
        <p className="lead">
          Page is under construction.<br />
          Stay tuned! ⏰<br />
        </p>
      </div>
    </>
  )
}

const ComingSoonPage = () => (
  <PageShell name={"About"}>
    <ComingSoon />
  </PageShell>
)

export default ComingSoonPage