import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import Rating from './sub-components/ProductRating'

const ProductDescriptionInfo = ({ product, discountedPrice, subs }) => {
  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0]?.color : '',
  )
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0]?.size[0]?.name : '',
  )
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0]?.size[0]?.stock : product.stock,
  )
  const [quantityCount, setQuantityCount] = useState(1)

  return (
    <div className="product-details-content ml-70">
      <h2>{product.name}</h2>
      <div className="product-details-price">
        {discountedPrice !== null ? (
          <Fragment>
            <span>${product.price.toFixed(2)}</span>{' '}
            <span className="old">${discountedPrice.toFixed(2)}</span>
          </Fragment>
        ) : (
          <span>${product.price?.toFixed(2)} </span>
        )}
      </div>
      {product.rating && product.rating > 0 ? (
        <div className="pro-details-rating-wrap">
          <div className="pro-details-rating">
            <Rating ratingValue={product.rating} />
          </div>
        </div>
      ) : (
        ''
      )}
      <div className="pro-details-list">
        <p>{product.description}</p>
      </div>

      {product.variation ? (
        <div className="pro-details-size-color">
          <div className="pro-details-color-wrap">
            <span>Color</span>
            <div className="pro-details-color-content">
              {product.variation.map((single, key) => {
                return (
                  <label
                    className={`pro-details-color-content--single ${single.color}`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={single.color}
                      name="product-color"
                      checked={
                        single.color === selectedProductColor ? 'checked' : ''
                      }
                      onChange={() => {
                        setSelectedProductColor(single.color)
                        setSelectedProductSize(single.size[0]?.name)
                        setProductStock(single.size[0]?.stock)
                        setQuantityCount(1)
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                )
              })}
            </div>
          </div>
          <div className="pro-details-size">
            <span>Size</span>
            <div className="pro-details-size-content">
              {product.variation &&
                product.variation.map((single) => {
                  return single.color === selectedProductColor
                    ? single.size.map((singleSize, key) => {
                        return (
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
                            <span className="size-name">{singleSize.size}</span>
                          </label>
                        )
                      })
                    : ''
                })}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {product.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a
              href={product.affiliateLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) : (
        <div className="pro-details-quality">
          <div className="cart-plus-minus">
            <button
              onClick={() =>
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
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
            {productStock && productStock > 0 ? (
              <button> Add To Cart </button>
            ) : (
              <button disabled>Out of Stock</button>
            )}
          </div>
          <div className="pro-details-wishlist">
            <button title="Add to wishlist">
              <i className="pe-7s-like" />
            </button>
          </div>
          <div className="pro-details-compare">
            <button title="Add to compare">
              <i className="pe-7s-shuffle" />
            </button>
          </div>
        </div>
      )}

      <div className="pro-details-meta">
        <span>Categories :</span>
        <ul>{product.category?.name}</ul>
      </div>
      {product.subs ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.subs.map((single, key) => (
              <li key={key}>
                <Link to={process.env.PUBLIC_URL + '/shop-grid-standard'}>
                  {single.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}

      <div className="pro-details-social">
        <ul>
          <li>
            <a href="//facebook.com">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="//dribbble.com">
              <i className="fa fa-dribbble" />
            </a>
          </li>
          <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li>
          <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

ProductDescriptionInfo.propTypes = {
  addToast: PropTypes.func,
  discountedPrice: PropTypes.number,
  product: PropTypes.object,
}

export default ProductDescriptionInfo
