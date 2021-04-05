import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { setActiveSort } from '../../helpers/product'

const ShopStar = ({ getFilterSortParams }) => {
  const [clear, setClear] = useState(false)
  const clearOption = () => {
    getFilterSortParams('star', 0)
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
                  getFilterSortParams('star', 0)
                  setActiveSort(e)
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
                  getFilterSortParams('star', 1)
                  setActiveSort(e)
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
                  getFilterSortParams('star', 2)
                  setActiveSort(e)
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
                  getFilterSortParams('star', 3)
                  setActiveSort(e)
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
                  getFilterSortParams('star', 4)
                  setActiveSort(e)
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
                  getFilterSortParams('star', 5)
                  setActiveSort(e)
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
