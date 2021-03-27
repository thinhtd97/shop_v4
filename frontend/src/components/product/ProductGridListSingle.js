import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import Rating from './sub-components/ProductRating'
import ProductModal from './ProductModal'
import { getDiscountPrice } from '../../helpers/product.js'

const ProductGridListSingle = ({
  sliderClassName,
  spaceBottomClass,
  product,
}) => {
  const [modalShow, setModalShow] = useState(false)
  const discountPrice = getDiscountPrice(product.price, product.discount)
  return (
    <Fragment>
      <div
        className={`col-xl-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ''
        }`}
      >
        <div
          className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ''}`}
        >
          <div className="product-img">
            <Link to={`/product/${product.slug}`}>
              <img className="default-img" src={product.image[0].url} alt="" />
              {product.image.length > 1 ? (
                <img className="hover-img" src={product.image[1].url} alt="" />
              ) : (
                ''
              )}
            </Link>
            {product.discount || product.newLaunced ? (
              <div className="product-img-badges">
                {product.discount && (
                  <span className="pink">-{product.discount}%</span>
                )}

                {product.newLaunced && <span className="purple">New</span>}
              </div>
            ) : (
              ''
            )}

            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
                <button title="Add to wishlist">
                  <i className="pe-7s-like" />
                </button>
              </div>
              <div className="pro-same-action pro-cart">
                <button
                  title="Add to cart"
                  disabled={product.countInStock === 0}
                >
                  {' '}
                  <i className="pe-7s-cart"></i> Add to cart
                </button>
                {/* 
                <button disabled className="active">
                  Out of Stock
                </button> */}
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
              <Link to={`/product/${product.slug}`}>{product.name}</Link>
            </h3>

            <div className="product-rating">
              <Rating ratingValue={5} />
            </div>

            <div className="product-price">
              {product.discount !== 0 ? (
                <Fragment>
                  <span>${discountPrice.toFixed(2)}</span>{' '}
                  <span className="old">${product.price.toFixed(2)}</span>
                </Fragment>
              ) : (
                <span>${product.price.toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>
        <div className="shop-list-wrap mb-30">
          <div className="row">
            <div className="col-xl-4 col-md-5 col-sm-6">
              <div className="product-list-image-wrap">
                <div className="product-img">
                  <Link
                    to={process.env.PUBLIC_URL + '/product/' + product.slug}
                  >
                    <img
                      className="default-img img-fluid"
                      src={product.image[0].url}
                      alt=""
                    />
                    <img
                      className="hover-img img-fluid"
                      src={product.image[1].url}
                      alt=""
                    />
                  </Link>
                  {product.newLaunced || product.discount !== 0 ? (
                    <div className="product-img-badges">
                      {product.discount && (
                        <span className="pink">
                          -{product.discount.toFixed(2)}%
                        </span>
                      )}

                      {product.newLaunced && (
                        <span className="purple">New</span>
                      )}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-7 col-sm-6">
              <div className="shop-list-content">
                <h3>
                  <Link to={`/product/${product.slug}`}>{product.name}</Link>
                </h3>
                {product.newLaunced || product.discount ? (
                  <div className="product-list-price">
                    {product.discount && (
                      <Fragment>
                        <span>${discountPrice.toFixed(2)}</span> <span className="old">${product.price.toFixed(2)}</span>
                      </Fragment>
                    )}
                    {product.newLaunced && <span className="purple">New</span>}
                  </div>
                ) : (
                  ''
                )}

                <div className="rating-review">
                  <div className="product-list-rating">
                    <Rating ratingValue={5} />
                  </div>
                </div>

                <p>{product.description}</p>

                <div className="shop-list-actions d-flex align-items-center">
                  <div className="shop-list-btn btn-hover">
                    <button title="Add to cart">
                      {' '}
                      <i className="pe-7s-cart"></i> Add to cart
                    </button>
                  </div>

                  <div className="shop-list-wishlist ml-10">
                    <button title="Add to wishlist">
                      <i className="pe-7s-like" />
                    </button>
                  </div>
                  <div className="shop-list-compare ml-10">
                    <button title="Add to compare">
                      <i className="pe-7s-shuffle" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal product={product} show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  )
}

export default ProductGridListSingle
