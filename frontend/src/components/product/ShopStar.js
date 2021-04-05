import PropTypes from 'prop-types'
import React from 'react'
import { setActiveSort } from '../../helpers/product'

const ShopStar = ({ getFilterSortParams }) => {
  return (
    <div className="sidebar-widget mt-40">
      <h4 className="pro-sidebar-title">Star </h4>
      <div className="sidebar-widget-list mt-20">
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
                ></i>
              </button>
              <button
                style={{ padding: '0px' }}
                className="text-uppercase"
                onClick={(e) => {
                  getFilterSortParams('star', 1)
                  setActiveSort(e)
                }}
              >
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
                ></i>
              </button>
              <button
                style={{ padding: '0px' }}
                className="text-uppercase"
                onClick={(e) => {
                  getFilterSortParams('star', 2)
                  setActiveSort(e)
                }}
              >
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
                ></i>
              </button>
              <button
                style={{ padding: '0px' }}
                className="text-uppercase"
                onClick={(e) => {
                  getFilterSortParams('star', 3)
                  setActiveSort(e)
                }}
              >
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
                ></i>
              </button>
              <button
                style={{ padding: '0px' }}
                className="text-uppercase"
                onClick={(e) => {
                  getFilterSortParams('star', 4)
                  setActiveSort(e)
                }}
              >
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
                ></i>
              </button>
              <button
                style={{ padding: '0px' }}
                className="text-uppercase"
                onClick={(e) => {
                  getFilterSortParams('star', 5)
                  setActiveSort(e)
                }}
              >
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
                ></i>
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
