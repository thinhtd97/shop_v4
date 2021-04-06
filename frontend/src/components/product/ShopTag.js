import PropTypes from 'prop-types'
import React, { useState } from 'react'

const ShopTag = ({ subs, getFilterTagsParams }) => {
  const [clear, setClear] = useState(false)
  const filters = []
  subs &&
    subs.filter((el) => {
      if (filters.indexOf(el.name) === -1) {
        filters.push(el.name)
        return true
      }
      return false
    })
  const handleActive = (e) => {
    const buttons = document.querySelectorAll('.filterTags')
    buttons.forEach((elem) => {
      elem.classList.remove('active')
    })
    e.currentTarget.classList.add('active')
  }
  const clearOption = () => {
    const buttons = document.querySelectorAll('.filterTags')
    buttons.forEach((elem) => {
      elem.classList.remove('active')
    })
    getFilterTagsParams('tag', '')
    setClear(false)
  }
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Tag</h4>
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
          {filters?.map((single, key) => (
            <li key={key}>
              <button
                className="filterTags"
                onClick={(e) => {
                  getFilterTagsParams('tag', single)
                  handleActive(e)
                  setClear(true)
                }}
              >
                {single}
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
