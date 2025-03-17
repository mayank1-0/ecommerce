import { HashLink } from 'react-router-hash-link'
import '../css/productHomePage.css'

const ProductCard = ({ productId, productImage, productName, productPrice }) => {
  return (
    <div className="col mb-5">
      <div className="card h-100">
        {/* <!-- Product image--> */}
        <HashLink to={`/product-details-page/${productId}`}>
        <img
          className="card-img-top"
          src={productImage}
          alt="..."
        />
        {/* <!-- Product details--> */}
        <div className="card-body p-4">
          <div className="text-center">
            {/* <!-- Product name--> */}
            <h5 className="fw-bolder">{productName}</h5>
            {/* <!-- Product price--> */}
            {productPrice}
          </div>
        </div>
        </HashLink>
        {/* <!-- Product actions--> */}
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <a className="btn btn-outline-dark mt-auto" href="#">
              Add to cart
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
