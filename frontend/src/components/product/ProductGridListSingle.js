import React, { Fragment, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Rating from './sub-components/ProductRating'
import ProductModal from './ProductModal'
import { getDiscountPrice } from '../../helpers/product.js'
import {
  addToCartAction,
  cartAddToDatabase,
} from '../../redux/actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { addWishlistAction } from '../../redux/actions/wishlistActions'

const ProductGridListSingle = ({
  sliderClassName,
  spaceBottomClass,
  product,
  cartItem,
  wishlistItem,
}) => {
  const { addToast } = useToasts()
  const history = useHistory()
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false)
  const [quantityCount] = useState(1)
  const [size] = useState('')
  const [color] = useState('')
  const discountPrice = product.discount
    ? getDiscountPrice(product.price, product.discount)
    : 0
  const { userInfo } = useSelector((state) => state.userLogin)
  const addToCart = (
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
  const handleAddToWishlist = (addToast, slug) => {
    if (!userInfo) {
      history.push('/login-register')
    } else {
      dispatch(addWishlistAction(addToast, slug))
    }
  }
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
                {wishlistItem ? (
                  <button disabled style={{ cursor: 'not-allowed' }}>
                    <i className="pe-7s-like" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToWishlist(addToast, product.slug)}
                    title="Add to wishlist"
                  >
                    <i className="pe-7s-like" />
                  </button>
                )}
              </div>
              <div className="pro-same-action pro-cart">
                {product.countInStock === 0 ? (
                  <button disabled className="active">
                    Out of Stock
                  </button>
                ) : (
                  <>
                    {product.variation && product.variation.length >= 1 ? (
                      <Link
                        to={`${process.env.PUBLIC_URL}/product/${product.slug}`}
                      >
                        <i className="fa fa-cog"></i> Select options
                      </Link>
                    ) : (
                      <>
                        {userInfo ? (
                          <>
                            {cartItem ? (
                              <button disabled> Added To Cart </button>
                            ) : (
                              <button
                                onClick={(e) =>
                                  addToCartDatabase(
                                    product._id,
                                    product.slug,
                                    product.name,
                                    product.image[0].url,
                                    product.price,
                                    product.countInStock,
                                    quantityCount,
                                    size,
                                    color,
                                    discountPrice,
                                    addToast,
                                  )
                                }
                              >
                                {' '}
                                Add To Cart{' '}
                              </button>
                            )}
                          </>
                        ) : (
                          <>
                            {cartItem ? (
                              <button disabled>Added To Cart</button>
                            ) : (
                              <button
                                onClick={(e) =>
                                  addToCart(
                                    product._id,
                                    product.slug,
                                    product.name,
                                    product.image[0].url,
                                    product.price,
                                    product.countInStock,
                                    quantityCount,
                                    size,
                                    color,
                                    discountPrice,
                                    addToast,
                                  )
                                }
                              >
                                {' '}
                                Add To Cart{' '}
                              </button>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}

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
              <Rating value={product.rating} />
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
                        <span className="pink">-{product.discount}%</span>
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
                        <span>${discountPrice.toFixed(2)}</span>{' '}
                        <span className="old">${product.price.toFixed(2)}</span>
                      </Fragment>
                    )}
                    {product.newLaunced && <span className="purple">New</span>}
                  </div>
                ) : (
                  ''
                )}

                <div className="rating-review">
                  <div className="product-list-rating">
                    <Rating value={product.rating} />
                  </div>
                </div>

                <p>{product.description}</p>

                <div className="shop-list-actions d-flex align-items-center">
                  <div className="shop-list-btn btn-hover">
                    {product.countInStock === 0 ? (
                      <Fragment>
                        {cartItem ? (
                          <button disabled>Added To Cart</button>
                        ) : (
                          <button title="Add to cart">
                            {' '}
                            <i className="pe-7s-cart"></i> Add to cart
                          </button>
                        )}
                      </Fragment>
                    ) : (
                      <button disabled title="Out of stock">
                        {' '}
                        <i className="pe-7s-cart"></i> Out of stock
                      </button>
                    )}
                  </div>

                  <div className="shop-list-wishlist ml-10">
                    {wishlistItem ? (
                      <button disabled>
                        <i className="pe-7s-like" />
                      </button>
                    ) : (
                      <button
                        onClick={(e) =>
                          handleAddToWishlist(addToast, product.slug)
                        }
                        title="Add to wishlist"
                      >
                        <i className="pe-7s-like" />
                      </button>
                    )}
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
        addtoast={addToast}
        cartItem={cartItem}
        wishlistItem={wishlistItem}
      />
    </Fragment>
  )
}

export default ProductGridListSingle
