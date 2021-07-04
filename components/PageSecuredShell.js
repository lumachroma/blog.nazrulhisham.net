import { useAuth } from '../lib/auth'
import PageShell from './PageShell'
import AccessDenied from './AccessDenied'

const PageSecuredShell = ({ name, children }) => {
  const { user } = useAuth()

  if (!user) {
    return (
      <PageShell name="Access Denied">
        <AccessDenied />
      </PageShell>
    )
  }

  return (
    <PageShell name={name}>
      {children}
    </PageShell>
  )
}

export default PageSecuredShell