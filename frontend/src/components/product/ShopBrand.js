import PropTypes from 'prop-types'
import React from 'react'
import { setActiveSort } from '../../helpers/product'

const ShopBrand = ({ brands, getSortParams }) => {
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Brand </h4>
      <div className="sidebar-widget-list mt-20">
        {brands ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={(e) => {
                    getSortParams('brand', '')
                    setActiveSort(e)
                  }}
                >
                  <span className="checkmark" /> All Brands{' '}
                </button>
              </div>
            </li>
            {brands?.map((brand, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={(e) => {
                        getSortParams('brand', brand)
                        setActiveSort(e)
                      }}
                    >
                      <span className="checkmark" /> {brand}{' '}
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          'No brands found'
        )}
      </div>
    </div>
  )
}

ShopBrand.propTypes = {
  brands: PropTypes.array,
  getSortParams: PropTypes.func,
}

export default ShopBrand
