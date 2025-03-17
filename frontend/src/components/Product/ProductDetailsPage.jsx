import React, { useState, useEffect } from 'react'
import './css/productDetails.css'
import Navbar from './common/Navbar'
import ProductDetailRow from './productRow/ProductDetailRow'
import Footer from './common/Footer'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ProductSection = ({ product, error }) => {
  const [itemQuantity, setItemQuantity] = useState(1)
  if (error) {
    return <p>{error}</p>
  }

  return (
    // <!-- Product section-->
    <div>
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={product.image}
                alt="..."
              />
            </div>
            <div className="col-md-6">
              <div className="small mb-1">{/* SKU: BST-498 */}</div>
              <h1 className="display-5 fw-bolder">{product.productName}</h1>
              <div className="fs-5 mb-5">
                <span>${product.price}</span>
                {/* <span className="text-decoration-line-through">$45.00</span> */}
              </div>
              <p className="lead">{product.description}</p>
              <div className="d-flex">
                <input
                  onChange={(e) => setItemQuantity(e.target.value)}
                  className="form-control text-center me-3"
                  id="inputQuantity"
                  type="num"
                  value={itemQuantity}
                  style={{ maxWidth: '3rem' }}
                />
                <button
                  className="btn btn-outline-dark flex-shrink-0"
                  type="button"
                >
                  <i className="bi-cart-fill me-1"></i>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const ProductDetailsPage = () => {
  const { productId } = useParams()
  const [productDetailsData, setProductDetailsData] = useState({}) // I'm expecting a object
  const [relatedProductsData, setRelatedProductsData] = useState([]) // I'm expecting an array of objects
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSelectedAndRelatedProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_LIVE_URL
        const response = await axios.get(
          `${apiUrl}/product/fetch-selected-product-and-related-products/${productId}`
        )
        if (response.data.success && response.data.relatedProducts) {
          setProductDetailsData(response.data.selectedProduct)
          setRelatedProductsData(response.data.relatedProducts)
          setError(null)
        } else if (response.data.success && !response.data.relatedProducts) {
          setProductDetailsData(response.data.selectedProduct)
          setRelatedProductsData(null)
          setError(null)
        } else {
          setError(response.data.message)
        }
      } catch (error) {
        setError(
          error.response?.data?.message || 'An error occured. Please try again'
        )
      }
    }

    fetchSelectedAndRelatedProducts()
  }, [productId])

  return (
    <div>
      <Navbar />
      <ProductSection product={productDetailsData} error={error} />
      <ProductDetailRow products={relatedProductsData} error={error} />
      <Footer />
    </div>
  )
}

export default ProductDetailsPage
