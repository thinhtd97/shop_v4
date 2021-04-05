import PropTypes from 'prop-types'
import React, { useState } from 'react'

const ShopStar = ({ getStarFilterParams }) => {
  const [clear, setClear] = useState(false)
  const clearOption = () => {
    getStarFilterParams('star', 0)
    setClear(false)
  }
  return (
    <div className="sidebar-widget mt-40">
      <h4 className="pro-sidebar-title">Star </h4>

      <div className="sidebar-widget-list mt-20">
        {clear && (
          <span onClick={clearOption} className="clearOption">
            <i
              style={{ fontSize: '18px', marginRight: '6px' }}
              className="fa fa-angle-left"
            ></i>
            Clear
          </span>
        )}
        <ul>
          <li>
            <div className="sidebar-widget-list-left">
              <button
                style={{ padding: '0px' }}
                className="text-uppercase"
                onClick={(e) => {
                  getStarFilterParams('star', 0)
                }}
              >
                <div className="rating">
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star-o filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star-o filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star-o filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star-o filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star-o filter-star"
                  ></i>{' '}
                  <p>From 0 star</p>
                </div>
              </button>
              <button
                style={{ padding: '0px' }}
                className="text-uppercase"
                onClick={(e) => {
                  getStarFilterParams('star', 1)
                  setClear(true)
                }}
              >
                <div className="rating">
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star-o filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star-o filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star-o filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star-o filter-star"
                  ></i>{' '}
                  <p>From 1 star</p>
                </div>
              </button>
              <button
                style={{ padding: '0px' }}
                className="text-uppercase"
                onClick={(e) => {
                  getStarFilterParams('star', 2)
                  setClear(true)
                }}
              >
                <div className="rating">
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star-o filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star-o filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star-o filter-star"
                  ></i>{' '}
                  <p>From 2 star</p>
                </div>
              </button>
              <button
                style={{ padding: '0px' }}
                className="text-uppercase"
                onClick={(e) => {
                  getStarFilterParams('star', 3)
                  setClear(true)
                }}
              >
                <div className="rating">
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star-o filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star-o filter-star"
                  ></i>{' '}
                  <p>From 3 star</p>
                </div>
              </button>
              <button
                style={{ padding: '0px' }}
                className="text-uppercase"
                onClick={(e) => {
                  getStarFilterParams('star', 4)
                  setClear(true)
                }}
              >
                <div className="rating">
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star-o filter-star"
                  ></i>{' '}
                  <p>From 4 star</p>
                </div>
              </button>
              <button
                style={{ padding: '0px' }}
                className="text-uppercase"
                onClick={(e) => {
                  getStarFilterParams('star', 5)
                  setClear(true)
                }}
              >
                <div className="rating">
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star filter-star"
                  ></i>
                  <i
                    style={{ color: 'yellow' }}
                    className="fa fa-star filter-star"
                  ></i>{' '}
                  <p>From 5 star</p>
                </div>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

ShopStar.propTypes = {
  getSortParams: PropTypes.func,
}

export default ShopStar
