import React, { Fragment, useState, useEffect } from 'react'
import Swiper from 'react-id-swiper'
import { Modal } from 'react-bootstrap'
import Rating from './sub-components/ProductRating'
import { getDiscountPrice } from '../../helpers/product'
import {
  addToCartAction,
  cartAddToDatabase,
} from '../../redux/actions/cartActions'
import { useToasts } from 'react-toast-notifications'
import { useDispatch } from 'react-redux'

function ProductModal(props) {
  const { addToast } = useToasts()
  const dispatch = useDispatch()
  const [gallerySwiper, getGallerySwiper] = useState(null)
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null)
  const { product, userInfo, cartItem } = props
  const discountedPrice = product.discount
    ? getDiscountPrice(product.price, product.discount)
    : 0
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0]?.color : '',
  )
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0]?.size[0]?.name : '',
  )
  const [productStock, setProductStock] = useState(
    product.variation
      ? product.variation[0]?.size[0]?.stock
      : product.countInStock,
  )
  const [quantityCount, setQuantityCount] = useState(1)
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper
      thumbnailSwiper.controller.control = gallerySwiper
    }
  }, [gallerySwiper, thumbnailSwiper])

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
  }

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  }

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
      <Modal
        show={props.show}
        onHide={props.onHide}
        className="product-quickview-modal-wrapper"
      >
        <Modal.Header closeButton></Modal.Header>

        <div className="modal-body">
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div className="product-large-image-wrapper">
                <Swiper {...gallerySwiperParams}>
                  {product.image &&
                    product.image.map((image, key) => {
                      return (
                        <div key={key}>
                          <div className="single-image">
                            <img src={image.url} className="img-fluid" alt="" />
                          </div>
                        </div>
                      )
                    })}
                </Swiper>
              </div>
              <div className="product-small-image-wrapper mt-15">
                <Swiper {...thumbnailSwiperParams}>
                  {product.image &&
                    product.image.map((image, key) => (
                      <div key={key}>
                        <div className="single-image">
                          <img src={image.url} className="img-fluid" alt="" />
                        </div>
                      </div>
                    ))}
                </Swiper>
              </div>
            </div>
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content">
                <h2>{product.name}</h2>
                <div className="product-details-price">
                  {product.discount ? (
                    <Fragment>
                      <span>${discountedPrice.toFixed(2)}</span>{' '}
                      <span className="old">${product.price.toFixed(2)}</span>
                    </Fragment>
                  ) : (
                    <span>${product.price.toFixed(2)}</span>
                  )}
                </div>
                <div className="pro-details-rating-wrap">
                  <div className="pro-details-rating">
                    <Rating />
                  </div>
                </div>

                <div className="pro-details-list">
                  <p>{product.description}</p>
                </div>
                {product.variation ? (
                  <div className="pro-details-size-color">
                    <div className="pro-details-color-wrap">
                      {product.variation.length > 0 && <span>Color</span>}
                      <div className="pro-details-color-content">
                        {product.variation.map((single, key) => (
                          <label
                            key={key}
                            className={`pro-details-color-content--single ${single.color}`}
                          >
                            <input
                              checked={
                                single.color === selectedProductColor
                                  ? 'checked'
                                  : ''
                              }
                              value={single.color}
                              onChange={() => {
                                setSelectedProductColor(single.color)
                                setSelectedProductSize(single.size[0]?.name)
                                setProductStock(single.size[0]?.stock)
                              }}
                              type="radio"
                              name="product-color"
                            />
                            <span className="checkmark"></span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="pro-details-size">
                      {product.variation.length > 0 && <span>Size</span>}
                      <div className="pro-details-size-content">
                        {product.variation &&
                          product.variation.map((single, key) => {
                            return single.color === selectedProductColor
                              ? single.size.map((singleSize, key) => (
                                  <label
                                    className={`pro-details-size-content--single`}
                                    key={key}
                                  >
                                    <input
                                      checked={
                                        singleSize.size === selectedProductSize
                                          ? 'checked'
                                          : ''
                                      }
                                      onChange={() => {
                                        setSelectedProductSize(singleSize.size)
                                        setProductStock(single.size[0].stock)
                                        setQuantityCount(1)
                                      }}
                                      type="radio"
                                      name="size"
                                      value={singleSize.size}
                                    />
                                    <span className="size-name">
                                      {singleSize.size}
                                    </span>
                                  </label>
                                ))
                              : ''
                          })}
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}

                <div className="pro-details-quality">
                  <div className="cart-plus-minus">
                    <button
                      onClick={() =>
                        setQuantityCount(
                          quantityCount > 1 ? quantityCount - 1 : 1,
                        )
                      }
                      className="dec qtybutton"
                    >
                      -
                    </button>
                    <input
                      className="cart-plus-minus-box"
                      type="text"
                      value={quantityCount}
                      readOnly
                    />
                    <button
                      onClick={() =>
                        setQuantityCount(
                          quantityCount < productStock
                            ? quantityCount + 1
                            : quantityCount,
                        )
                      }
                      className="inc qtybutton"
                    >
                      +
                    </button>
                  </div>
                  <div className="pro-details-cart btn-hover">
                    {product.countInStock === 0 ? (
                      <button disabled>Out of Stock</button>
                    ) : (
                      <>
                        {userInfo ? (
                          <Fragment>
                            
                            <button
                              onClick={() =>
                                addToCartDatabase(
                                  product._id,
                                  product.slug,
                                  product.name,
                                  product.image[0].url,
                                  product.price,
                                  product.countInStock,
                                  quantityCount,
                                  selectedProductSize,
                                  selectedProductColor,
                                  discountedPrice,
                                  addToast,
                                )
                              }
                            >
                              {' '}
                              Add To Cart{' '}
                            </button>
                          </Fragment>
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
                                quantityCount,
                                selectedProductSize,
                                selectedProductColor,
                                discountedPrice,
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

                    {/* <button disabled>Out of Stock</button> */}
                  </div>
                  <div className="pro-details-wishlist">
                    <button title="Add to wishlist">
                      <i className="pe-7s-like" />
                    </button>
                  </div>
                  <div className="pro-details-compare">
                    <button title={`Add to compare`}>
                      <i className="pe-7s-shuffle" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  )
}

export default ProductModal
