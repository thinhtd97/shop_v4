import PropTypes from 'prop-types'
import React from 'react'
import { setActiveSort } from '../../helpers/product'

const ShopCategories = ({ getSortParams, categories }) => {
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        <ul>
          <li>
            <div className="sidebar-widget-list-left">
              <button
                onClick={(e) => {
                  getSortParams("category", "")
                  setActiveSort(e)
                }}
              >
                <span className="checkmark" /> All Categories
              </button>
            </div>
          </li>
          {categories?.map((single, key) => (
            <li key={key}>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={(e) => {
                    getSortParams("category", single.name)
                    setActiveSort(e)
                  }}
                >
                  {' '}
                  <span className="checkmark" /> {single.name}{' '}
                </button>
              </div>
            </li>
          ))}
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
