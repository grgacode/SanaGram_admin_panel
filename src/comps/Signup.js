import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

const Signup = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      setLoading(false)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }
  }

  return (
    <div className='backdrop'>
      <form onSubmit={handleSubmit} className="login-form ">
        <h1>Sign Up</h1>

        <div className="txtb">
          <input type="text" placeholder="email" ref={emailRef} required />
        </div>
        <div className="txtb">
          <input type="password" placeholder="password" ref={passwordRef} required />
        </div>
        <div className="txtb">
          <input type="password" placeholder="confirm password" ref={passwordConfirmRef} required />
        </div>
        <input disabled={loading} type="submit" className="logbtn" value="Sign Up"></input>
        {error && <h5 className='alert-text'>{error}</h5>}
        <div className='bottom-text'>
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </form>
    </div>
  )
}

export default Signup;