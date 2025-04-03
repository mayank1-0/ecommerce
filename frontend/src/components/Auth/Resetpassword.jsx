import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {
  const navigate = useNavigate()
  const { token } = useParams()
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')

  async function handleFormSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      // const apiUrl = import.meta.env.VITE_LOCAL_URL
      const apiUrl = import.meta.env.VITE_LOCAL_URL
      const response = await axios.put(`${apiUrl}/auth/reset-password`, {
        token,
        newPassword,
      })
      if (response.data.success) {
        setError('')
        alert('Password updated successfully')
        navigate('/')
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
              <h3>Reset Password</h3>
            </div>
            {error && (
              <p style={{ color: 'red', marginLeft: '125px' }}>{error}</p>
            )}
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="new-password">New Password</label>
                  <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    id="new-password"
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
