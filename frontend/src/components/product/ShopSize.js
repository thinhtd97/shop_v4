import PropTypes from 'prop-types'
import React from 'react'
import { setActiveSort } from '../../helpers/product'

const ShopSize = () => {
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

          <li>
            <div className="sidebar-widget-list-left">
              <button
                className="text-uppercase"
                onClick={(e) => {
                  setActiveSort(e)
                }}
              >
                S <span className="checkmark" />
              </button>
            </div>
          </li>
          <li>
            <div className="sidebar-widget-list-left">
              <button
                className="text-uppercase"
                onClick={(e) => {
                  setActiveSort(e)
                }}
              >
                M <span className="checkmark" />
              </button>
            </div>
          </li>
          <li>
            <div className="sidebar-widget-list-left">
              <button
                className="text-uppercase"
                onClick={(e) => {
                  setActiveSort(e)
                }}
              >
                L <span className="checkmark" />
              </button>
            </div>
          </li>
          <li>
            <div className="sidebar-widget-list-left">
              <button
                className="text-uppercase"
                onClick={(e) => {
                  setActiveSort(e)
                }}
              >
                XL{' '}
                <span className="checkmark" />
              </button>
            </div>
          </li>
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
