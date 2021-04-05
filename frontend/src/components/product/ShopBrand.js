import PropTypes from 'prop-types'
import React from 'react'

const ShopBrand = ({ brands, getFilterBrandParams }) => {
  const handleActive = (e) => {
    const buttons = document.querySelectorAll('.filterBrand')
    buttons.forEach((elem) => {
      elem.classList.remove('active')
    })
    e.currentTarget.classList.add('active')
  }
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Brand </h4>
      <div className="sidebar-widget-list mt-20">
        {brands ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  className="filterBrand"
                  onClick={(e) => {
                    getFilterBrandParams('brand', '')
                    handleActive(e)
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
                      className="filterBrand"
                      onClick={(e) => {
                        getFilterBrandParams('brand', brand)
                        handleActive(e)
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
