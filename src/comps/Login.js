import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      setLoading(false)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }
    
  }

    return (
        <div className='backdrop'>
            <form onSubmit={handleSubmit} className="login-form ">
                <h1>Log In</h1>
                <div className="txtb">
                    <input type="text" placeholder="email" ref={emailRef} required />
                </div>
                <div className="txtb">
                    <input type="password" placeholder="password" ref={passwordRef} required />
                </div>
                <input disabled={loading} type="submit" className="logbtn" value="Log In"></input>
                {error && <h5 className='alert-text'>{error}</h5>}
                <div className='bottom-text'>
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
            </form>
        </div>
    )
}