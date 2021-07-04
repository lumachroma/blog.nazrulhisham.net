import Link from 'next/link'

const AccessDenied = () => {
  return (
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title display-4">403</h4>
            <h6 className="card-subtitle mb-2 text-muted">Access Denied / Forbidden</h6>
            <p className="card-text">
              <strong>I am very sorry.</strong> You do not have permission to access this page.{' '}
              Please login or contact me if you think this is a mistake.
            </p>
            <Link href="/login">
              <a className="btn btn-primary card-link">Login</a>
            </Link>
            <Link href="/">
              <a className="btn btn-secondary card-link">Home</a>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  )
}

export default AccessDenied