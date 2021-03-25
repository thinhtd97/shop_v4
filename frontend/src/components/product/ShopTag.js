import PropTypes from 'prop-types'
import React from 'react'
import { setActiveSort } from '../../helpers/product'

const ShopTag = ({ tags }) => {
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Tag </h4>
      <div className="sidebar-widget-tag mt-25">
        <ul>
          <li>
            <button
              onClick={(e) => {
                setActiveSort(e)
              }}
            >
              Men
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

ShopTag.propTypes = {
  getSortParams: PropTypes.func,
  tags: PropTypes.array,
}

export default ShopTag
