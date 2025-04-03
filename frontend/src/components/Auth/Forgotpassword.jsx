import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ForgotPassword = () => {
  const [resetPasswordEmail, setResetPasswordEmail] = useState('')
  const [error, setError] = useState('')

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      //const apiUrl = import.meta.env.VITE_LOCAL_URL
      const apiUrl = import.meta.env.VITE_LOCAL_URL
      const response = await axios.post(
        `${apiUrl}/auth/send-reset-password-link`,
        { resetPasswordEmail }
      )
      if (response.data.success) {
        setError('')
        alert(`Reset password link sent to your email. Kindly check`)
      } else {
        setError(response.data.message)
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
              <h3>Forgot Password</h3>
            </div>
            {error && (
              <p style={{ color: 'red', marginLeft: '130px' }}>{error}</p>
            )}
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Enter your email address</label>
                  <input
                    onChange={(e) => setResetPasswordEmail(e.target.value)}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Submit
                </button>
              </form>
            </div>
            <div className="card-footer text-center">
              <small>&copy; 2025 Your Company</small>
              <br />
              <Link to="/">Remembered your password? Login here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
