import PageShell from './PageShell'

const PageSecuredShell = ({ name, children }) => {
  //TODO: secure routing
  return (
    <PageShell name={name}>
      {children}
    </PageShell>
  )
}

export default PageSecuredShell