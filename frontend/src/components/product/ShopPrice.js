import PropTypes from 'prop-types'
import React from 'react'
import { setActiveSort } from '../../helpers/product'

const ShopPrice = ({ getFilterSortParams }) => {
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Price</h4>
      <div className="sidebar-widget-tag mt-25">
        <ul>
          <li>
            <button onClick={() => getFilterSortParams('filterPrice', '')}>
              All Price
            </button>
          </li>
          <br />
          <li>
            <button
              onClick={() => getFilterSortParams('filterPrice', '0to200')}
            >
              From 0 To 200
            </button>
          </li>
          <li>
            <button
              onClick={() => getFilterSortParams('filterPrice', '201to400')}
            >
              From 201 To 400
            </button>
          </li>
          <li>
            <button
              onClick={() => getFilterSortParams('filterPrice', '401to800')}
            >
              From 401 To 800
            </button>
          </li>
          <li>
            <button
              onClick={() => getFilterSortParams('filterPrice', '800tomax')}
            >
              Over 800
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ShopPrice
