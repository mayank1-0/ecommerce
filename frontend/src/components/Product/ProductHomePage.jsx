import './css/productHomePage.css'
import Navbar from './common/Navbar'
import ProductHomePageRow from './productRow/productHomePageRow'
import Footer from './common/Footer'
import { useParams } from 'react-router-dom'

const ProductHomePageHeader = () => {
  return (
    // <!-- Header-->
    <div>
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Shop in style</h1>
            <p className="lead fw-normal text-white-50 mb-0">
              With this shop hompeage template
            </p>
          </div>
        </div>
      </header>
    </div>
  )
}

const ProductHomePage = () => {

  const {category} = useParams();
  
  return (
    <div>
      <Navbar />
      <ProductHomePageHeader />
      <ProductHomePageRow category={category}/>
      <Footer />
    </div>
  )
}

export default ProductHomePage
