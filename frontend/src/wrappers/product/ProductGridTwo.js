import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import ProductGridSingleTwo from '../../components/product/ProductGridSingleTwo'
const ProductGridTwo = ({ sliderClassName, spaceBottomClass }) => {
  return (
    <Fragment>
      <ProductGridSingleTwo
        sliderClassName={sliderClassName}
        spaceBottomClass={spaceBottomClass}
      />
       <ProductGridSingleTwo
        sliderClassName={sliderClassName}
        spaceBottomClass={spaceBottomClass}
      />
    </Fragment>
  )
}

ProductGridTwo.propTypes = {
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
}

export default ProductGridTwo
