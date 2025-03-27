import React, { useState, useEffect } from 'react'
import '../css/productHomePage.css'
import ProductCard from '../common/ProductCard'
import axios from 'axios'

const ProductHomePageRow = ({ category }) => {
  const [productsData, setProductsData] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchHomePageRowData() {
      try {
        // const apiUrl = import.meta.env.VITE_LIVE_URL
        const apiUrl = import.meta.env.VITE_LIVE_URL
        const response = await axios.get(
          `${apiUrl}/product/fetch-products/${category}`
        )
        if (response.data.success) {
          setError('')
          setProductsData(response.data.products)
        } else {
          setError(response.data.message)
        }
      } catch (error) {
        setError(
          error.response?.data?.message ||
            'An error occured. Please try again later'
        )
      }
    }
    fetchHomePageRowData()
  }, [category])

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {/* Display fetched products*/}
          {productsData.length > 0 ? (
            productsData.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  productId={product._id}
                  productImage={product.image}
                  productName={product.productName}
                  productPrice={`${product.price}`}
                />
              )
            })
          ) : (
            <p>{error ? error : 'Loading products...'}</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductHomePageRow
