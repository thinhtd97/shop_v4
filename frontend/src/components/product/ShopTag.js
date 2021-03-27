import PropTypes from 'prop-types'
import React from 'react'
import { setActiveSort } from '../../helpers/product'

const ShopTag = ({ subs, getSortParams }) => {
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Tag </h4>
      <div className="sidebar-widget-tag mt-25">
        <ul>
          {subs?.map((single, key) => (
            <li key={key}>
              <button
                onClick={(e) => {
                  getSortParams("tag", single.name)
                  setActiveSort(e)
                }}
              >
                {single.name}
              </button>
            </li>
          ))}
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
