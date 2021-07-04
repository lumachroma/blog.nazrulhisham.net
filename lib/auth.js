import React, { useState, useContext, createContext, useEffect } from 'react'
import Router from 'next/router'
import cookie from 'js-cookie'

const cookieName = 'kookie-user-auth'
const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    const cacheUser = cookie.getJSON(cookieName)

    if (cacheUser) {
      setUser(cacheUser)
    }

  }, [])

  const handleUser = (rawUser) => {
    if (rawUser) {
      // cookie.set(cookieName, rawUser, { expires: 1/48 }) //http cookie
      cookie.set(cookieName, rawUser) //session cookie
      setUser(rawUser)
      setErrorMsg(null)
      setLoading(false)
      return user
    } else {
      cookie.remove(cookieName)
      setUser(null)
      setUser(false)
      setLoading(false)
      return false
    }
  }

  const signinWithEmail = (email, password) => {
    let payload = { email, password }
    setLoading(true)
    setTimeout(() => {
      fetch('/api/public/account/token', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      }).then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            handleUser(json)
            Router.push('/secure/dashboard')
          })
        } else {
          setErrorMsg(`${response.status}: ${response.statusText}`)
          handleUser(false)
        }
      }).catch((err) => {
        setErrorMsg(err)
        handleUser(false)
      })
    }, 1000)
  }

  const signout = () => {
    Router.push('/')
    setErrorMsg(null)
    handleUser(false)
  }

  const isInRole = (role) => {
    if (user && user.roles) {
      const userRoles = user.roles
      if (Array.isArray(userRoles)) {
        return ((userRoles.find(userRole => userRole === role)) !== undefined)
      }
    }
    return false
  }

  return {
    user,
    loading,
    errorMsg,
    setErrorMsg,
    signinWithEmail,
    signout,
    isInRole,
  }
}