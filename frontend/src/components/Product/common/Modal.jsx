import '../css/modal.css'
import { useCart } from '../../../CartContext'
import { useAuth } from '../../../AuthContext'
import { useNavigate } from 'react-router-dom'

const Modal = ({ isVisible, onClose }) => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, totalCart } = useCart();
  const { user } = useAuth();

  const proceedToCheckout = () => {
    try {
      const storedUserString = localStorage.getItem('user');
      const storedUser = storedUserString ? JSON.parse(storedUserString) : null;
      if( user && storedUser && 
        user.customerName === storedUser.customerName &&
        user.email === storedUser.email &&
        user.token === storedUser.token
      )
      navigate('/checkout')
      else{
        alert('Login first');
        navigate('/login');
      }
    } catch (error) {
      console.log(`error ${JSON.stringify(error, null, 2)}`);
    }
  }

  if (!isVisible) return null

  return (
    <div
      className="modal fade show"
      style={{ display: 'block' }}
      id="staticBackdrop"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Your Cart</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
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
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={proceedToCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
