import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductModal from './ProductModal'

const ProductGridSingleTwo = ({ sliderClassName, spaceBottomClass }) => {
  const [modalShow, setModalShow] = useState(false)

  return (
    <Fragment>
      <div
        className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ''
        }`}
      >
        <div
          className={`product-wrap-2 ${
            spaceBottomClass ? spaceBottomClass : ''
          }`}
        >
          <div className="product-img">
            <Link to="#">
              <img
                className="default-img"
                src="https://res.cloudinary.com/ducthinh2109/image/upload/v1616672666/pt1ofj5xtbz6itbmhwet.jpg"
                alt=""
              />
              <img
                className="hover-img"
                src="https://res.cloudinary.com/ducthinh2109/image/upload/v1616672666/pt1ofj5xtbz6itbmhwet.jpg"
                alt=""
              />
            </Link>
            <div className="product-img-badges">
              <span className="pink">-10%</span>

              <span className="purple">New</span>
            </div>

            <div className="product-action-2">
              <Link to={`#`} title="Select options">
                <i className="fa fa-cog"></i>
              </Link>

              <button title="Add to cart">
                {' '}
                <i className="fa fa-shopping-cart"></i>{' '}
              </button>

              <button onClick={() => setModalShow(true)} title="Quick View">
                <i className="fa fa-eye"></i>
              </button>

              <button title="Add to compare">
                <i className="fa fa-retweet"></i>
              </button>
            </div>
          </div>
          <div className="product-content-2">
            <div className="title-price-wrap-2">
              <h3>
                <Link to="#">Product 1</Link>
              </h3>
              <div className="price-2">
                <Fragment>
                  <span>$10</span> <span className="old">$8</span>
                </Fragment>
              </div>
            </div>
            <div className="pro-wishlist-2">
              <button title="Add to wishlist">
                <i className="fa fa-heart-o" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  )
}

ProductGridSingleTwo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object,
}

export default ProductGridSingleTwo
