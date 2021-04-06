import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { getDiscountPrice } from '../../helpers/product'
import ProductModal from './ProductModal'
import ProductRating from './sub-components/ProductRating'

const ProductGridSingle = ({ product, sliderClassName, spaceBottomClass }) => {
  const [modalShow, setModalShow] = useState(false)
  const { addToast } = useToasts()

  const discountedPrice = getDiscountPrice(product.price, product.discount)

  return (
    <Fragment>
      <div
        className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ''
        }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ''}`}
        >
          <div className="product-img">
            <Link to={process.env.PUBLIC_URL + '/product/' + product.slug}>
              <img className="default-img" src={product?.image[0].url} alt="" />

              <img className="hover-img" src={product?.image[1].url} alt="" />
            </Link>
            {product.discount !== 0 || product.new ? (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="pink">-{product.discount}%</span>
                ) : (
                  ''
                )}
                {product.newLaunced ? <span className="purple">New</span> : ''}
              </div>
            ) : (
              ''
            )}

            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
                <button title="Add To Wishlist">
                  <i className="pe-7s-like" />
                </button>
              </div>
              <div className="pro-same-action pro-cart">
                {product.affiliateLink ? (
                  <a
                    href={product.affiliateLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {' '}
                    Buy now{' '}
                  </a>
                ) : product.variation && product.variation.length >= 1 ? (
                  <Link
                    to={`${process.env.PUBLIC_URL}/product/${product.slug}`}
                  >
                    Select Option
                  </Link>
                ) : product.countInStock && product.countInStock > 0 ? (
                  <button title="Add To Cart">
                    {' '}
                    <i className="pe-7s-cart"></i>{' '}
                  </button>
                ) : (
                  <button disabled className="active">
                    Out of Stock
                  </button>
                )}
              </div>
              <div className="pro-same-action pro-quickview">
                <button onClick={() => setModalShow(true)} title="Quick View">
                  <i className="pe-7s-look" />
                </button>
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <h3>
              <Link to={process.env.PUBLIC_URL + '/product/' + product.slug}>
                {product.name}
              </Link>
            </h3>

            <div className="product-rating">
              <ProductRating value={product.rating} />
            </div>

            <div className="product-price">
              {discountedPrice !== null ? (
                <Fragment>
                  <span>${product.price}</span>{' '}
                  <span className="old">${discountedPrice}</span>
                </Fragment>
              ) : (
                <span>${product.price} </span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        discountedprice={discountedPrice}
        addtoast={addToast}
      />
    </Fragment>
  )
}

ProductGridSingle.propTypes = {
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
}

export default ProductGridSingle
