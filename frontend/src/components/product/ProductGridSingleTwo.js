import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductModal from './ProductModal'
import { getDiscountPrice } from '../../helpers/product';

const ProductGridSingleTwo = ({
  sliderClassName,
  spaceBottomClass,
  product,
}) => {
  const [modalShow, setModalShow] = useState(false)
  const discountedPrice = getDiscountPrice(product.price, product.discount);
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
            <Link to={`/product/${product.slug}`}>
              <img className="default-img" src={product.image[0].url} alt="" />
              {product.image.length > 0 ? (
                <img className="hover-img" src={product.image[1].url} alt="" />
              ) : (
                ''
              )}
            </Link>
            {product.discount || product.newLaunced ? (
              <div className="product-img-badges">
                {product.discount !== 0 ? (
                  <span className="pink">-{product.discount}%</span>
                ) : (
                  ''
                )}

                {product.newLaunced ? <span className="purple">New</span> : ''}
              </div>
            ) : (
              ''
            )}

            <div className="product-action-2">
              {product.variation && product.variation > 0 ? (
                <Link
                  to={`${process.env.PUBLIC_URL}/product/${product.slug}`}
                  title="Select options"
                >
                  <i className="fa fa-cog"></i>
                </Link>
              ) : product.countInStock && product.countInStock > 0 ? (
                <button title="Add to cart">
                  {' '}
                  <i className="fa fa-shopping-cart"></i>{' '}
                </button>
              ) : (
                <button disabled className="active" title="Out of stock">
                  <i className="fa fa-shopping-cart"></i>
                </button>
              )}

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
                <Link to="#">{product.name}</Link>
              </h3>
              <div className="price-2">
                {product.discount === 0 ? (
                 <span className="old">${product.price.toFixed(2)}</span>
                ) : (
                  <Fragment>
                    <span>
                      ${discountedPrice.toFixed(2)}
                    </span>{" "}
                    <span className="old">
                      ${product.price.toFixed(2)}
                    </span>
                  </Fragment>
                )}
                
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
      <ProductModal show={modalShow} product={product} onHide={() => setModalShow(false)} />
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
