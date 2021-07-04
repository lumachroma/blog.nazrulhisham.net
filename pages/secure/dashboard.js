import Link from 'next/link'
import { useAuth } from '../../lib/auth'
import PageSecuredShell from '../../components/PageSecuredShell'

const Dashboard = () => {
  const { user, signout } = useAuth()

  return (
    <>
      {/* TODO: Dashboard */}
      <div className="py-2">
        <h1 className="display-4">Dashboard</h1>
        <p className="lead">
          {user && <span className="fw-lighter">Welcome {user.name}<small></small></span>}
        </p>

          <div className="btn-group btn-group" role="group" aria-label="Basic example">
            <Link href="/secure/blog">
              <a role="button" className="btn btn-outline-primary">
                <i className="bi bi-sliders" />
              </a>
            </Link>
            <button role="button" className="btn btn-outline-primary" onClick={signout}>
              <i className="bi bi-person-x-fill" />
            </button>
          </div>

      </div>
    </>
  )
}

const SecureDashboardPage = () => (
  <PageSecuredShell name={"Dashboard"}>
    <Dashboard />
  </PageSecuredShell>
)

export default SecureDashboardPage