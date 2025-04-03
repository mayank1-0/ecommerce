import { useState } from 'react'
import axios from 'axios'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import './css1.css'
import { useCart } from '../../CartContext'

const CheckoutPage = () => {
  const { cart, removeFromCart, updateQuantity, totalCart, clearCart } =
    useCart()
  const [shippingAddress, setShippingAddress] = useState('')
  const [error, setError] = useState('')
  const [paymentStep, setPaymentStep] = useState('address') // 'address' or 'payment'
  // eslint-disable-next-line no-unused-vars
  const [orderId, setOrderId] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleAddressSubmit = async (e) => {
    e.preventDefault()
    if (!shippingAddress.trim()) {
      setError('Please enter a valid shipping address')
      return
    }

    setIsProcessing(true)
    try {
      const apiUrl = import.meta.env.VITE_LOCAL_URL
      const response = await axios.put(
        `${apiUrl}/auth/update-shipping-address`,
        {
          shippingAddress,
        },
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      )

      if (response.data.success) {
        setError('')
        setPaymentStep('payment')
      } else {
        setError(response.data.message || 'Failed to update shipping address')
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 'An error occurred. Please try again'
      )
    } finally {
      setIsProcessing(false)
    }
  }

  const createPayPalOrder = async () => {
    setIsProcessing(true)
    try {
      const apiUrl = import.meta.env.VITE_LOCAL_URL
      const response = await axios.post(
        `${apiUrl}/checkout/create-paypal-order`,
        {
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.productPrice,
            quantity: item.quantity,
          })),
          totalAmount: totalCart(),
          shippingAddress,
        },
        {
          withCredentials: true,
        }
      )

      if (!response.data.orderID) {
        throw new Error('No order ID received from server')
      }

      setOrderId(response.data.orderID)
      return response.data.orderID
    } catch (error) {
      setError(
        error.response?.data?.message || 'Failed to create payment order'
      )
      throw error
    } finally {
      setIsProcessing(false)
    }
  }

  const onApprovePayment = async (data) => {
    setIsProcessing(true)
    try {
      const apiUrl = import.meta.env.VITE_LOCAL_URL
      const response = await axios.post(
        `${apiUrl}/checkout/capture-paypal-order/${data.orderID}`,
        {},
        { withCredentials: true }
      )

      if (response.data.success) {
        // Clear cart on successful payment
        clearCart()
        // Redirect to success page with order details
        window.location.href = `/order/success?order_id=${data.orderID}`
      } else {
        setError(response.data.message || 'Payment processing failed')
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Payment processing failed')
      console.error('Payment capture error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="page-container">
      <div className="content-wrap">
        {paymentStep === 'address' ? (
          <div className="container1">
            <div className="row justify-content-center mt-5">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header text-center">
                    <h3>Shipping Details</h3>
                  </div>
                  {error && (
                    <div className="alert alert-danger text-center">
                      {error}
                    </div>
                  )}
                  <div className="card-body">
                    <form onSubmit={handleAddressSubmit}>
                      <div className="form-group">
                        <label htmlFor="shipping">Shipping address</label>
                        <textarea
                          onChange={(e) => setShippingAddress(e.target.value)}
                          className="form-control"
                          id="shipping"
                          value={shippingAddress}
                          required
                          rows="3"
                          placeholder="Enter full shipping address including street, city, state, and zip code"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mt-3"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : 'Continue to Payment'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container1">
            <div className="row justify-content-center mt-5">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header text-center">
                    <h3>Complete Your Payment</h3>
                    <p>Shipping to: {shippingAddress}</p>
                  </div>
                  {error && (
                    <div className="alert alert-danger text-center">
                      {error}
                    </div>
                  )}
                  <div className="card-body">
                    <div className="mb-4">
                      <h5>Order Summary</h5>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((item) => (
                            <tr key={item.id}>
                              <td>{item.name}</td>
                              <td>${item.productPrice}</td>
                              <td>
                                <input
                                  type="number"
                                  className="form-control"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateQuantity(
                                      item.id,
                                      parseInt(e.target.value)
                                    )
                                  }
                                  min="1"
                                />
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  Remove
                                </button>
                              </td>
                              <td>${item.productPrice * item.quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="text-end h5">Total: ${totalCart()}</div>
                    </div>

                    <div className="payment-section">
                      <h5 className="mb-3">Select Payment Method</h5>
                      <PayPalScriptProvider
                        options={{
                          'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
                          currency: 'USD',
                          'disable-funding': 'credit,card', // Optional: customize funding options
                        }}
                      >
                        <PayPalButtons
                          style={{
                            layout: 'vertical',
                            color: 'blue',
                            shape: 'rect',
                            label: 'paypal',
                          }}
                          createOrder={createPayPalOrder}
                          onApprove={onApprovePayment}
                          onError={(err) => {
                            console.error('PayPal error:', err)
                            setError(
                              `Payment error: ${
                                err.message || 'Unable to process payment'
                              }`
                            )
                          }}
                          onCancel={() => {
                            setError('Payment was cancelled')
                          }}
                          disabled={isProcessing || cart.length === 0}
                        />
                      </PayPalScriptProvider>
                    </div>

                    <button
                      className="btn btn-secondary mt-3"
                      onClick={() => setPaymentStep('address')}
                      disabled={isProcessing}
                    >
                      Back to Shipping
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="modal-dialog modal-dialog-centered mt-4">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Your Cart</h5>
            </div>
            <div className="modal-body">
              {cart.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <>
                  <table className="table">
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>${item.productPrice}</td>
                          <td>Qty: {item.quantity}</td>
                          <td>${item.productPrice * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-end h5">Total: ${totalCart()}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-container">
        <footer className="py-5 bg-dark">
          <div className="container">
            <p className="m-0 text-center text-white">
              Copyright &copy; Your Website {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default CheckoutPage
