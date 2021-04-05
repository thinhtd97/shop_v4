import PropTypes from 'prop-types'
import React from 'react'
import ProductGridFive from './ProductGridFive'

const ProductGridFiveContainer = ({
  spaceTopClass,
  spaceBottomClass,
  category,
  products,
}) => {
  return (
    <div
      className={`product-area hm5-section-padding ${
        spaceTopClass ? spaceTopClass : ''
      }  ${spaceBottomClass ? spaceBottomClass : ''}`}
    >
      {' '}
      <h3 style={{marginBottom: '26px'}}>New Arrivals</h3>
      <div className="container-fluid">
        <div className="row">
          <ProductGridFive
            category={category}
            limit={12}
            products={products}
            spaceBottomClass="mb-20"
          />
        </div>
      </div>
    </div>
  )
}

ProductGridFiveContainer.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
}

export default ProductGridFiveContainer
