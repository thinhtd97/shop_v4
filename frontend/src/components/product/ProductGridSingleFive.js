import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { getDiscountPrice } from '../../helpers/product'
import {
  addToCartAction,
  cartAddToDatabase,
} from '../../redux/actions/cartActions'
import ProductModal from './ProductModal'

const ProductGridSingleFive = ({
  product,
  currency,
  sliderClassName,
  spaceBottomClass,
}) => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const [modalShow, setModalShow] = useState(false)
  const { addToast } = useToasts()
  const dispatch = useDispatch()
  const [quantity] = useState(1)
  const [size] = useState('')
  const [color] = useState('')
  const discountedPrice = product.discount
    ? getDiscountPrice(product.price, product.discount)
    : 0
  const addToCart = (
    e,
    product,
    slug,
    name,
    image,
    price,
    countInStock,
    quantity,
    size,
    color,
    discountedPrice,
  ) => {
    e.preventDefault()
    let cartId = `${Date.now()}`
    dispatch(
      addToCartAction(
        product,
        cartId,
        slug,
        name,
        image,
        price,
        countInStock,
        quantity,
        size,
        color,
        discountedPrice,
        addToast,
      ),
    )
  }
  const addToCartDatabase = (
    product,
    slug,
    name,
    image,
    price,
    countInStock,
    quantity,
    size,
    color,
    discountedPrice,
    addToast,
  ) => {
    dispatch(
      cartAddToDatabase(
        product,
        slug,
        name,
        image,
        price,
        countInStock,
        quantity,
        size,
        color,
        discountedPrice,
        addToast,
      ),
    )
  }
  return (
    <Fragment>
      <div
        className={`col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 ${
          sliderClassName ? sliderClassName : ''
        }`}
      >
        <div
          className={`product-wrap-3 scroll-zoom ${
            spaceBottomClass ? spaceBottomClass : ''
          }`}
        >
          <div className="product-img">
            <Link
              to={process.env.PUBLIC_URL + '/product/' + product.image[0].url}
            >
              <img
                className="default-img"
                src={process.env.PUBLIC_URL + product.image[1].url}
                alt=""
              />
            </Link>
            {product.discount || product.new ? (
              <div className="product-img-badges">
                {product.discount ? (
                  <span className="pink">-{product.discount}%</span>
                ) : (
                  ''
                )}
                {product.new ? <span className="purple">New</span> : ''}
              </div>
            ) : (
              ''
            )}

            <div className="product-content-3-wrap">
              <div className="product-content-3">
                <div className="product-title">
                  <h3>
                    <Link
                      to={process.env.PUBLIC_URL + '/product/' + product.slug}
                    >
                      {product.name}
                    </Link>
                  </h3>
                </div>
                <div className="price-3">
                  {discountedPrice !== 0 ? (
                    <Fragment>
                      <span>${product.price.toFixed(2)}</span>{' '}
                      <span className="old">${discountedPrice.toFixed(2)}</span>
                    </Fragment>
                  ) : (
                    <span>${product.price.toFixed(2)} </span>
                  )}
                </div>
                <div className="product-action-3">
                  <div className="pro-same-action pro-wishlist">
                    <button title={`Add to wishlist`}>
                      <i class="fa fa-heart-o"></i>
                    </button>
                  </div>
                  <div className="pro-same-action pro-cart">
                    {product.affiliateLink ? (
                      <a
                        href={product.affiliateLink}
                        rel="noopener noreferrer"
                        target="_blank"
                        title="Buy now"
                      >
                        {' '}
                        <i className="fa fa-shopping-cart"></i>{' '}
                      </a>
                    ) : product.variation && product.variation.length >= 1 ? (
                      <Link
                        to={`${process.env.PUBLIC_URL}/product/${product.slug}`}
                        title="Select options"
                      >
                        <i className="fa fa-cog"></i>
                      </Link>
                    ) : product.countInStock && product.countInStock > 0 ? (
                      <>
                        {userInfo ? (
                          <button
                            onClick={(e) =>
                              addToCartDatabase(
                                product._id,
                                product.slug,
                                product.name,
                                product.image[0].url,
                                product.price,
                                product.countInStock,
                                quantity,
                                size,
                                color,
                                discountedPrice,
                                addToast,
                              )
                            }
                            title="Add To Cart"
                          >
                            {' '}
                            <i className="fa fa-shopping-cart"></i>{' '}
                          </button>
                        ) : (
                          <button
                            onClick={(e) =>
                              addToCart(
                                e,
                                product._id,
                                product.slug,
                                product.name,
                                product.image[0].url,
                                product.price,
                                product.countInStock,
                                quantity,
                                size,
                                color,
                                discountedPrice,
                                addToast,
                              )
                            }
                            title="Add To Cart"
                          >
                            {' '}
                            <i className="fa fa-shopping-cart"></i>{' '}
                          </button>
                        )}
                      </>
                    ) : (
                      <button disabled className="active" title="Out of stock">
                        <i className="fa fa-shopping-cart"></i>
                      </button>
                    )}
                  </div>

                  <div className="pro-same-action pro-quickview">
                    <button
                      onClick={() => setModalShow(true)}
                      title="Quick View"
                    >
                      <i className="fa fa-eye"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        userInfo={userInfo}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedprice={discountedPrice}
        addtoast={addToast}
      />
    </Fragment>
  )
}

ProductGridSingleFive.propTypes = {
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
}

export default ProductGridSingleFive
