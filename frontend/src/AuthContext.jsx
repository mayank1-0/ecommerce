import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  const login = async (email, password) => {
    try {
      const apiUrl = import.meta.env.VITE_LIVE_URL
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      })
      if (response.data.success) {
        const token = response.data.token
        const customerName = response.data.customerName
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setUser({ customerName, email, token })
        setError('')
        localStorage.setItem(
          'user',
          JSON.stringify({ customerName, email, token })
        ) // Persist user data
      } else {
        setError(response.data.message || 'Login failed')
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 'An error occurred. Please try again'
      )
    }
  }

  const logout = async () => {
    try {
      const apiUrl = import.meta.env.VITE_LIVE_URL
      const response = await axios.get(`${apiUrl}/auth/logout`) // Call the logout endpoint
      if (response.data.success) {
        setUser(null)
        await localStorage.removeItem("user") // Clear persisted user data
        await delete axios.defaults.headers.common['Authorization']
      } else {
        setError(response.data.message || 'Logout failed')
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 'An error occurred during logout'
      )
    }
  }

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
