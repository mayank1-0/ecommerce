import { useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios'
import './css/checkout.css'
import { useCart } from '../../CartContext'

const CheckoutPage = () => {
  const { cart, removeFromCart, updateQuantity, totalCart } = useCart()
  const [shippingAddress, setShippingAddress] = useState('')
  const [error, setError] = useState('')

  const checkout = async () => {
    try {
      const apiUrl = import.meta.env.VITE_LIVE_URL
      const response = await axios.put(
        `${apiUrl}/auth/update-shipping-address`,
        { shippingAddress }
      )
      if (response.data.success) {
        setError('')
        alert(
          `Shipping address updated successfully. Proceding to payment gateway`
        )
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
    <div className="page-container">
      <div className="content-wrap">
        <div className="container1">
          <div className="row justify-content-center mt-5">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header text-center">
                  <h3>Shipping Details</h3>
                </div>
                {error && (
                  <p style={{ color: 'red', marginLeft: '300px' }}>{error}</p>
                )}
                <div className="card-body">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      checkout()
                    }}
                  >
                    <div className="form-group">
                      <label htmlFor="shipping">Shipping address</label>
                      <input
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="form-control"
                        id="shipping"
                        aria-describedby="shipping"
                        placeholder="Enter shipping address"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Checkout
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Your Cart</h5>
            </div>
            <div className="modal-body">
              <table className="show-cart table">
                <tbody>
                  {/* Cart content will be dynamically inserted here */}
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>${item.productPrice}</td>
                      <td>
                        <div className="input-group">
                          <input
                            type="number"
                            className="item-count form-control"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value))
                            }
                          />
                        </div>
                      </td>
                      <td>
                        <button
                          className="delete-item btn btn-danger"
                          onClick={() => removeFromCart(item.id)}
                        >
                          X
                        </button>
                      </td>
                      <td>${item.productPrice * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="grand-total">Total price: ${totalCart()}</div>
            </div>
          </div>
        </div>
        <div className="footer-container">
          <footer className="py-5 bg-dark">
            <div className="container">
              <p className="m-0 text-center text-white">
                Copyright &copy; Your Website 2023
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
