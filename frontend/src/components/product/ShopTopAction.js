import PropTypes from 'prop-types'
import React from 'react'
import { setActiveLayout } from '../../helpers/product'

const ShopTopAction = ({ getLayout, getFilterSortParams, brands }) => {
  return (
    <div className="shop-top-bar mb-35">
      <div className="select-shoing-wrap">
        <div className="shop-select">
          <select
            onChange={(e) => getFilterSortParams('filterSort', e.target.value)}
          >
            <option value="default">Default</option>
            <option value="priceHighToLow">Price - High to Low</option>
            <option value="priceLowToHigh">Price - Low to High</option>
          </select>
        </div>
        <div className="shop-select">
          <select
            onChange={(e) => getFilterSortParams('filterPrice', e.target.value)}
          >
            <option value="">All Price</option>
            <option value="0to200">0 to 200</option>
            <option value="201to400">201 to 400</option>
            <option value="401to800">401 to 800</option>
            <option value="800tomax">800 more</option>
          </select>
        </div>
      </div>

      <div className="shop-tab">
        <button
          onClick={(e) => {
            getLayout('grid two-column')
            setActiveLayout(e)
          }}
        >
          <i className="fa fa-th-large" />
        </button>
        <button
          onClick={(e) => {
            getLayout('grid three-column')
            setActiveLayout(e)
          }}
        >
          <i className="fa fa-th" />
        </button>
        <button
          onClick={(e) => {
            getLayout('list')
            setActiveLayout(e)
          }}
        >
          <i className="fa fa-list-ul" />
        </button>
      </div>
    </div>
  )
}

ShopTopAction.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number,
}

export default ShopTopAction
