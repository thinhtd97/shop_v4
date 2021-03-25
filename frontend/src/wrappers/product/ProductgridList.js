import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import ProductGridListSingle from '../../components/product/ProductGridListSingle'

const ProductGrid = ({ sliderClassName, spaceBottomClass }) => {
  return (
    <Fragment>
      <ProductGridListSingle
        sliderClassName={sliderClassName}
        spaceBottomClass={spaceBottomClass}
      />
    </Fragment>
  )
}

ProductGrid.propTypes = {
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
}

export default ProductGrid
