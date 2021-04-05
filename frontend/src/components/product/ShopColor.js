import PropTypes from 'prop-types'
import React from 'react'

const ShopColor = ({ colors, getFilterColorParams }) => {
  const handleActive = (e) => {
    const buttons = document.querySelectorAll('.filter-color')
    buttons.forEach((elem) => {
      elem.classList.remove('active')
    })
    e.currentTarget.classList.add('active')
  }
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Color </h4>
      <div className="sidebar-widget-list mt-20">
        {colors ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  className="filter-color"
                  onClick={(e) => {
                    getFilterColorParams('color', '')
                    handleActive(e)
                  }}
                >
                  <span className="checkmark" /> All Colors{' '}
                </button>
              </div>
            </li>
            {colors.map((color, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      className="filter-color"
                      onClick={(e) => {
                        getFilterColorParams('color', color)
                        handleActive(e)
                      }}
                    >
                      <span className="checkmark" /> {color}{' '}
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          'No colors found'
        )}
      </div>
    </div>
  )
}

ShopColor.propTypes = {
  colors: PropTypes.array,
  getSortParams: PropTypes.func,
}

export default ShopColor
