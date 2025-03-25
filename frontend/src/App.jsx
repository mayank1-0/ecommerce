import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Auth components
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import ForgotPassword from './components/Auth/Forgotpassword'
import ResetPassword from './components/Auth/Resetpassword'
// Product components
import ProductHomePage from './components/Product/ProductHomePage'
import ProductDetailsPage from './components/Product/ProductDetailsPage'
// Checkout component
import CheckoutPage from './components/Checkout/CheckoutPage'
import { CartProvider } from './CartContext'
import { AuthProvider } from './AuthContext'

function App() {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* Home page, product details page and checkout page */}
              <Route path="/:category?" element={<ProductHomePage />} />
              <Route
                path="/product-details-page/:productId"
                element={<ProductDetailsPage />}
              />
              <Route path="/checkout" element={<CheckoutPage />} />
              {/* ------------------------------------ */}
              {/* Auth functionality */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              {/* ------------------------------------ */}
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </div>
  )
}

export default App
