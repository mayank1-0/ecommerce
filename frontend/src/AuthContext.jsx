import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  const login = async (email, password) => {
    try {
      const apiUrl = import.meta.env.VITE_LOCAL_URL
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
          'currentUser',
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
      const apiUrl = import.meta.env.VITE_LOCAL_URL
      // eslint-disable-next-line no-unused-vars
      const response = await axios.get(`${apiUrl}/auth/logout`, {
        withCredentials: true, // Ensure credentials are sent
      }) // Call the logout endpoint
      setUser(null)
      localStorage.removeItem('currentUser') // Clear persisted user data
      delete axios.defaults.headers.common['Authorization']
    } catch (error) {
      setUser(null)
      localStorage.removeItem('currentUser')
      delete axios.defaults.headers.common['Authorization']
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
