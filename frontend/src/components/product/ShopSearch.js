import React from 'react'

const ShopSearch = ({ getSortParams }) => {
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Search </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <input
          type="text"
          onChange={(e) => getSortParams('searchQuery', e.target.value)}
          placeholder="Search here..."
        />
      </div>
    </div>
  )
}

export default ShopSearch
