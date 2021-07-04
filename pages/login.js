import { useState } from 'react'
import { useAuth } from '../lib/auth'
import PageShell from '../components/PageShell'

const Login = () => {
  const { signinWithEmail, loading, errorMsg, setErrorMsg } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const target = e.target
    const value = target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.email && form.password) {
      setErrorMsg(null)
      signinWithEmail(form.email, form.password)
    } else {
      setErrorMsg("Email and/or Password is required")
    }
  }

  const handleReset = (e) => {
    e.preventDefault()
    setForm({ ...form, email: '', password: '' })
    setErrorMsg(null)
  }

  return (
    <div className="row">
      <div className="col-md"></div>
      <div className="col-md-4">
        <div className="card shadow">
          <h5 className="card-header">
            Login
          </h5>
          <div className="card-body">
            <form id="login-form">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-envelope" />
                </span>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                  required
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2">
                  <i className="bi bi-shield-lock" />
                </span>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon2"
                  required
                />
              </div>
              <div className="mb-3">
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {!loading && <span>Login</span>}
                    {loading && <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Authenticating...</>}
                  </button>
                  <button
                    type="reset"
                    className="btn btn-secondary"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="mb-3">
                {errorMsg &&
                  <div className="alert alert-danger" role="alert">
                    {errorMsg}
                  </div>
                }
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md"></div>
    </div>

  )
}
const LoginPage = () => (
  <PageShell name="Login" path="/login">
    <Login />
  </PageShell>
)
export default LoginPage