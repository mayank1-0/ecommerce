import '../css/productDetails.css'
import ProductCard from '../common/ProductCard'

const ProductDetailsRow = ({ products, error }) => {
  if( error ) return <p>{error}</p>

  return (
    <section className="py-5 bg-light">
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {products.map((product) => <ProductCard key={product._id} productId={product._id} productImage={product.image} productName={product.productName} productPrice={`${product.price}`}/>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductDetailsRow
