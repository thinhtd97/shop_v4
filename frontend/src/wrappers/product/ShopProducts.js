import PropTypes from 'prop-types'
import React from 'react'
import ProductgridList from './ProductgridList'

const ShopProducts = ({ layout }) => {
  return (
    <div className="shop-bottom-area mt-35">
      <div className={`row ${layout ? layout : ''}`}>
        <ProductgridList spaceBottomClass="mb-25" />
      </div>
    </div>
  )
}

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array,
}

export default ShopProducts
