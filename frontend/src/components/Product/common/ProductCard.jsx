import { HashLink } from 'react-router-hash-link'
import '../css/productHomePage.css'
import { useCart } from '../../../CartContext'

const ProductCard = ({
  productId,
  productImage,
  productName,
  productPrice,
  quantity
}) => {

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Create a product object
    const product = {
      id: productId, // Use 'id' instead of 'productId' to match the CartContext logic
      name: productName,
      productPrice: productPrice,
      image: productImage,
      quantity: quantity || 1, // Default quantity to 1 if not provided
    };

    // Add the product to the cart using the addToCart function from CartContext
    addToCart(product);
  };

  return (
    <div className="col mb-5">
      <div className="card h-100">
        {/* <!-- Product image--> */}
        <HashLink to={`/product-details-page/${productId}`}>
          <img className="card-img-top" src={productImage} alt="..." />
          {/* <!-- Product details--> */}
          <div className="card-body p-4">
            <div className="text-center">
              {/* <!-- Product name--> */}
              <h5 className="fw-bolder">{productName}</h5>
              {/* <!-- Product price--> */}
              ${productPrice}
            </div>
          </div>
        </HashLink>
        {/* <!-- Product actions--> */}
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <button
              className="btn btn-outline-dark mt-auto"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
