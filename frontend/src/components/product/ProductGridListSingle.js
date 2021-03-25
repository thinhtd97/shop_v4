import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import Rating from './sub-components/ProductRating'
import ProductModal from './ProductModal'

const ProductGridListSingle = ({ sliderClassName, spaceBottomClass }) => {
  const [modalShow, setModalShow] = useState(false)

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
            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
                <button title="Add to wishlist">
                  <i className="pe-7s-like" />
                </button>
              </div>
              <div className="pro-same-action pro-cart">
                <button title="Add to cart">
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
              <Link to="#">Product 1</Link>
            </h3>

            <div className="product-rating">
              <Rating ratingValue={5} />
            </div>

            <div className="product-price">
              <Fragment>
                <span>$10</span> <span className="old">$20</span>
              </Fragment>
            </div>
          </div>
        </div>
        <div className="shop-list-wrap mb-30">
          <div className="row">
            <div className="col-xl-4 col-md-5 col-sm-6">
              <div className="product-list-image-wrap">
                <div className="product-img">
                  <Link to="#">
                    <img
                      className="default-img img-fluid"
                      src="https://res.cloudinary.com/ducthinh2109/image/upload/v1616672666/pt1ofj5xtbz6itbmhwet.jpg"
                      alt=""
                    />
                    <img
                      className="hover-img img-fluid"
                      src="https://res.cloudinary.com/ducthinh2109/image/upload/v1616672666/pt1ofj5xtbz6itbmhwet.jpg"
                      alt=""
                    />
                  </Link>
                  <div className="product-img-badges">
                    <span className="pink">-10%</span>

                    <span className="purple">New</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-7 col-sm-6">
              <div className="shop-list-content">
                <h3>
                  <Link to="#">Product 1</Link>
                </h3>
                <div className="product-list-price">
                  <Fragment>
                    <span>$10</span> <span className="old">$16</span>
                  </Fragment>
                </div>

                <div className="rating-review">
                  <div className="product-list-rating">
                    <Rating ratingValue={5} />
                  </div>
                </div>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>

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
      <ProductModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  )
}

export default ProductGridListSingle
