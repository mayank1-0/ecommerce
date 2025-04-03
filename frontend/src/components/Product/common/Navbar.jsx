import { HashLink } from 'react-router-hash-link'
import React, { useState } from 'react'
import Modal from './Modal'
import '../css/productHomePage.css'
import { useCart } from '../../../CartContext'
import { useAuth } from '../../../AuthContext'

const Navbar = () => {
  const { totalCount } = useCart()
  const { user, logout } = useAuth()

  const [modalVisible, setModalVisible] = useState(false) // To control modal visibility
  const [dropdownVisible, setDropdownVisible] = useState(false) // To control dropdown visibility

  // Show modal
  const openModal = () => {
    setModalVisible(true) // Open the modal
  }

  // Close modal
  const closeModal = () => {
    setModalVisible(false) // Close the modal
  }

  // Toggle dropdown visibility
  const toggleDropdown = (e) => {
    e.preventDefault()
    setDropdownVisible((prev) => !prev)
  }

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    ? JSON.parse(localStorage.getItem('currentUser'))
    : []

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    setDropdownVisible(false)
  }

  // Check if user is logged in by comparing IDs or emails or customerNames or token
  const isLoggedIn = user && currentUser && user.email === currentUser.email && user.customerName === currentUser.customerName && user.token === currentUser.token

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="#!">
            Start Bootstrap
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li className="nav-item">
                <HashLink className="nav-link active" aria-current="page" to="">
                  Home
                </HashLink>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#!">
                  About
                </a>
              </li> */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Shop
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <HashLink className="dropdown-item" to="">
                      All Products
                    </HashLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <HashLink className="dropdown-item" to="/popular-items">
                      Popular Items
                    </HashLink>
                  </li>
                  {/* <li>
                    <a className="dropdown-item" href="#!">
                      New Arrivals
                    </a>
                  </li> */}
                </ul>
              </li>
            </ul>
            <ul className="navbar-nav align-items-center ml-auto ml-md-0">
              <li className="nav-item dropdown show">
                {isLoggedIn ? (
                  // When user is logged in - show dropdown toggle
                  <a
                    href="#"
                    className="nav-link pr-0"
                    role="button"
                    onClick={toggleDropdown}
                    aria-haspopup="true"
                    aria-expanded={dropdownVisible}
                  >
                    <div className="media align-items-center btn1 btn-outline-dark1">
                      <img
                        src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"
                        alt="User"
                        className="-dOa_b L_FVxe"
                        width="24"
                        height="24"
                      />
                      <span className="mb-0 text-sm">{user.customerName}</span>
                    </div>
                  </a>
                ) : (
                  // When no user is logged in - make entire element a link to login
                  <HashLink
                    to="/login"
                    className="nav-link pr-0"
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="media align-items-center btn1 btn-outline-dark1">
                      <img
                        src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"
                        alt="Login"
                        className="-dOa_b L_FVxe"
                        width="24"
                        height="24"
                      />
                      <span className="mb-0 text-sm">Login</span>
                    </div>
                  </HashLink>
                )}

                {/* Dropdown menu - only shown when user is logged in */}
                {isLoggedIn && (
                  <div
                    className={`dropdown-menu dropdown-menu-right ${
                      dropdownVisible ? 'show' : ''
                    }`}
                  >
                    <div className="dropdown-header noti-title">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </div>
                    <div className="dropdown-divider"></div>
                    <a href="#" onClick={handleLogout} className="dropdown-item">
                      <i className="ni ni-user-run"></i>
                      <span>Logout</span>
                    </a>
                  </div>
                )}
              </li>
            </ul>
            <button
              className="btn btn-outline-dark"
              type="button"
              onClick={openModal}
            >
              <i className="bi-cart-fill me-1"></i>
              Cart
              <span className="badge bg-dark text-white ms-1 rounded-pill">
                {totalCount() !== 0 ? totalCount() : ''}
              </span>
            </button>
            {/* Modal */}
            <Modal isVisible={modalVisible} onClose={closeModal} />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
