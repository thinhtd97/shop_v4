import PropTypes from 'prop-types'
import React, { useState } from 'react'

const ShopBrand = ({ brands, getFilterBrandParams }) => {
  const [clear, setClear] = useState(false)
  const handleActive = (e) => {
    const buttons = document.querySelectorAll('.filterBrand')
    buttons.forEach((elem) => {
      elem.classList.remove('active')
    })
    e.currentTarget.classList.add('active')
  }
  const clearOption = () => {
    const buttons = document.querySelectorAll('.filterBrand')
    buttons.forEach((elem) => {
      elem.classList.remove('active')
    })
    getFilterBrandParams('brand', '')
    setClear(false)
  }
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Brand </h4>
      <div className="sidebar-widget-list mt-20">
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
                        setClear(true)
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
