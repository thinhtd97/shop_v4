import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import ProductGridSingleFive from '../../components/product/ProductGridSingleFive'
const ProductGridFive = ({
  currency,
  sliderClassName,
  products,
  spaceBottomClass,
}) => {
  return (
    <Fragment>
      {products && products.map((product, key) => (
        <ProductGridSingleFive
          sliderClassName={sliderClassName}
          spaceBottomClass={spaceBottomClass}
          currency={currency}
          product={product}
          key={key}
        />
      ))}
    </Fragment>
  )
}

ProductGridFive.propTypes = {
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array,
}

export default ProductGridFive
