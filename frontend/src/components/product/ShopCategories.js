import PropTypes from 'prop-types'
import React from 'react'
import { setActiveSort } from '../../helpers/product'

const ShopCategories = ({ getSortParams }) => {
  const text = () => {
    console.log('test');
  }
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        <ul>
          <li>
            <div className="sidebar-widget-list-left">
              <button
                onClick={(e) => {
                  setActiveSort(e)
                }}
              >
                <span className="checkmark" /> All Categories
              </button>
            </div>
          </li>

          <li>
            <div className="sidebar-widget-list-left">
              <button
                onClick={(e) => {
                  setActiveSort(e)
                }}
              >
                {' '}
                <span className="checkmark" /> Men{' '}
              </button>
            </div>
          </li>
          <li>
            <div className="sidebar-widget-list-left">
              <button
                onClick={(e) => {
                  setActiveSort(e)
                }}
              >
                {' '}
                <span className="checkmark" /> Kids{' '}
              </button>
            </div>
          </li>
          <li>
            <div className="sidebar-widget-list-left">
              <button
                onClick={(e) => {
                  setActiveSort(e)
                }}
              >
                {' '}
                <span className="checkmark" /> Women{' '}
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func,
}

export default ShopCategories
