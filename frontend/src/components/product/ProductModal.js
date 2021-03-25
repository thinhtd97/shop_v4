import React, { Fragment, useState, useEffect } from 'react'
import Swiper from 'react-id-swiper'
import { Modal } from 'react-bootstrap'
import Rating from './sub-components/ProductRating'
function ProductModal(props) {
  const [gallerySwiper, getGallerySwiper] = useState(null)
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null)

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
                  <div>
                    <div className="single-image">
                      <img
                        src="https://res.cloudinary.com/ducthinh2109/image/upload/v1616672666/pt1ofj5xtbz6itbmhwet.jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                </Swiper>
              </div>
              <div className="product-small-image-wrapper mt-15">
                <Swiper {...thumbnailSwiperParams}>
                  <div>
                    <div className="single-image">
                      <img
                        src="https://res.cloudinary.com/ducthinh2109/image/upload/v1616672666/pt1ofj5xtbz6itbmhwet.jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div>
                    <div className="single-image">
                      <img
                        src="https://res.cloudinary.com/ducthinh2109/image/upload/v1616672666/pt1ofj5xtbz6itbmhwet.jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                  <div>
                    <div className="single-image">
                      <img
                        src="https://res.cloudinary.com/ducthinh2109/image/upload/v1616672666/pt1ofj5xtbz6itbmhwet.jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                </Swiper>
              </div>
            </div>
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content">
                <h2>Product 1</h2>
                <div className="product-details-price">
                  <Fragment>
                    <span>$10</span> <span className="old">$15</span>
                  </Fragment>
                </div>
                <div className="pro-details-rating-wrap">
                  <div className="pro-details-rating">
                    <Rating ratingValue={5} />
                  </div>
                </div>

                <div className="pro-details-list">
                  <p>
                    Ut enim ad minima veniam, quis nostrum exercitationem ullam
                    corporis suscipit laboriosam
                  </p>
                </div>

                <div className="pro-details-size-color">
                  <div className="pro-details-color-wrap">
                    <span>Color</span>
                    <div className="pro-details-color-content">
                      <label
                        className={`pro-details-color-content--single blue`}
                      >
                        <input type="radio" name="product-color" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                  <div className="pro-details-size">
                    <span>Size</span>
                    <div className="pro-details-size-content">
                      <label className={`pro-details-size-content--single`}>
                        <input type="radio" value="S" />
                        <span className="size-name">S</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pro-details-quality">
                  <div className="cart-plus-minus">
                    <button className="dec qtybutton">-</button>
                    <input
                      className="cart-plus-minus-box"
                      type="text"
                      // value={quantityCount}
                      readOnly
                    />
                    <button className="inc qtybutton">+</button>
                  </div>
                  <div className="pro-details-cart btn-hover">
                    <button> Add To Cart </button>
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
