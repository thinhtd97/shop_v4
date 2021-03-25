import PropTypes from 'prop-types'
import React from 'react' 
import ShopSearch from '../../components/product/ShopSearch'
import ShopCategories from '../../components/product/ShopCategories'
import ShopColor from '../../components/product/ShopColor'
import ShopSize from '../../components/product/ShopSize'
import ShopTag from '../../components/product/ShopTag'

const ShopSidebar = ({ sideSpaceClass }) => {
  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ''}`}>
      {/* shop search */}
      <ShopSearch />

      {/* filter by categories */}
      <ShopCategories />

      {/* filter by color */}
      <ShopColor />

      {/* filter by size */}
      <ShopSize />

      {/* filter by tag */}
      <ShopTag />
    </div>
  )
}

ShopSidebar.propTypes = {
  sideSpaceClass: PropTypes.string,
}

export default ShopSidebar
