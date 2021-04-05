import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'

const ShopCategories = ({ getCateFilterParams, categories }) => {
  const [clear, setClear] = useState(false)
  const clearOption = () => {
    getCateFilterParams('category', '')
    setClear(false)
  }
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-tag mt-25">
        {clear && (
          <span onClick={clearOption} className="clearOption">
            <i
              style={{
                fontSize: '18px',
                marginRight: '6px',
                marginBottom: '10px',
              }}
              className="fa fa-angle-left"
            ></i>
            Clear
          </span>
        )}
        <ul>
          {categories?.map((single, key) => (
            <Fragment key={key}>
              <li>
                <div className="sidebar-widget-list-left">
                  <button
                    onClick={(e) => {
                      getCateFilterParams('category', single.name)
                      setClear(true)
                    }}
                  >
                    {single.name} <span className="checkmark" />
                  </button>
                </div>
              </li>
              <br />
            </Fragment>
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
