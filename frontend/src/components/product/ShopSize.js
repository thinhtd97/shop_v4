import PropTypes from 'prop-types'
import React from 'react'
import { setActiveSort } from '../../helpers/product'

const ShopSize = () => {
  const sizes = ['S', 'M', 'L', 'XL', 'XXL']
  return (
    <div className="sidebar-widget mt-40">
      <h4 className="pro-sidebar-title">Size </h4>
      <div className="sidebar-widget-list mt-20">
        <ul>
          <li>
            <div className="sidebar-widget-list-left">
              <button
                onClick={(e) => {
                  setActiveSort(e)
                }}
              >
                <span className="checkmark" /> All Sizes{' '}
              </button>
            </div>
          </li>
          {sizes.map((single, key) => (
            <li key={key}>
              <div className="sidebar-widget-list-left">
                <button
                  className="text-uppercase"
                  onClick={(e) => {
                    setActiveSort(e)
                  }}
                >
                  {single} <span className="checkmark" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

ShopSize.propTypes = {
  getSortParams: PropTypes.func,
  sizes: PropTypes.array,
}

export default ShopSize
