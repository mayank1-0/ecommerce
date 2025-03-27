import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      // const apiUrl = import.meta.env.VITE_LIVE_URL
      const apiUrl = import.meta.env.VITE_LIVE_URL
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        fullName,
        email,
        password,
      })
      if (response.data.success) {
        setError('')
        alert(`Signup successful`)
        navigate('/')
      } else {
        setError(response.data.message || 'Signup failed')
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 'An error occured. Please try again'
      )
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h3>Signup</h3>
            </div>
            {error && (
              <p style={{ color: 'red', marginLeft: '200px' }}>{error}</p>
            )}
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label for="name">Full Name</label>
                  <input
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="email">Email address</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Signup
                </button>
              </form>
            </div>
            <div className="card-footer text-center">
              <small>&copy; 2025 Your Company</small>
              <br />
              <Link to="/">Already have an account? Login Here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
