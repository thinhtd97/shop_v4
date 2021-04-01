import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import ProductGridListSingle from '../../components/product/ProductGridListSingle'

const ProductGrid = ({ sliderClassName, spaceBottomClass, products }) => {
  return (
    <Fragment>
      {products &&
        products.map((product, key) => (
          <ProductGridListSingle
            key={key}
            product={product}
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
          />
        ))}
        {products && products.length === 0 && (<p style={{marginLeft: '1em'}}>Product Not Found</p>)}
    </Fragment>
  )
}

ProductGrid.propTypes = {
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
}

export default ProductGrid
