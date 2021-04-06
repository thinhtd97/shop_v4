import PropTypes from 'prop-types'
import React, { useState } from 'react'

const ShopSize = ({ sizes, getFilterSizeParams }) => {
  const [clear, setClear] = useState(false)
  const handleActive = (e) => {
    const buttons = document.querySelectorAll('.filterSize')
    buttons.forEach((elem) => {
      elem.classList.remove('active')
    })
    e.currentTarget.classList.add('active')
  }
  const clearOption = () => {
    const buttons = document.querySelectorAll('.filterSize')
    buttons.forEach((elem) => {
      elem.classList.remove('active')
    })
    getFilterSizeParams('size', '')
    setClear(false)
  }
  return (
    <div className="sidebar-widget mt-40">
      <h4 className="pro-sidebar-title">Size </h4>
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
        <ul>
          <li>
            <div className="sidebar-widget-list-left">
              <button
                className="filterSize"
                onClick={(e) => {
                  getFilterSizeParams('size', '')
                  handleActive(e)
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
                  className="text-uppercase filterSize"
                  onClick={(e) => {
                    getFilterSizeParams('size', single)
                    handleActive(e)
                    setClear(true)
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
