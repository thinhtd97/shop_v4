import PropTypes from 'prop-types'
import React from 'react'

const ShopTag = ({ subs, getFilterTagsParams }) => {
  const filters = []
  subs && subs.filter((el) => {
    if(filters.indexOf(el.name) === -1) {
      filters.push(el.name);
      return true;
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
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Tag</h4>
      <div className="sidebar-widget-tag mt-25">
        <ul>
          {filters?.map((single, key) => (
            <li key={key}>
              <button
                className="filterTags"
                onClick={(e) => {
                  getFilterTagsParams('tag', single)
                  handleActive(e)
                  
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
