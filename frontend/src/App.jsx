import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Auth components
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import ForgotPassword from './components/Auth/Forgotpassword'
import ResetPassword from './components/Auth/Resetpassword'
// Product components
import ProductHomePage from './components/Product/ProductHomePage'
import ProductDetailsPage from './components/Product/ProductDetailsPage'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/products-home-page/:category?" element={<ProductHomePage />} />
          <Route path="/product-details-page/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
