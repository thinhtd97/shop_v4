import PropTypes from 'prop-types'
import React from 'react'
import ShopSearch from '../../components/product/ShopSearch'
import ShopCategories from '../../components/product/ShopCategories'
import ShopColor from '../../components/product/ShopColor'
import ShopSize from '../../components/product/ShopSize'
import ShopTag from '../../components/product/ShopTag'
import ShopBrand from '../../components/product/ShopBrand'
import ShopStar from '../../components/product/ShopStar'
import ShopPrice from '../../components/product/ShopPrice'

const ShopSidebar = ({
  sideSpaceClass,
  getSortParams,
  getFilterSortParams,
  categories,
  colors,
  sizes,
  subs,
  brands,
}) => {
  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ''}`}>
      {/* shop search */}
      <ShopSearch getSortParams={getSortParams} />

      {/* filter by categories */}
      <ShopCategories categories={categories} getSortParams={getSortParams} />

      {/* filter by color */}
      <ShopColor colors={colors} getSortParams={getSortParams} />

      {/* filter by size */}
      <ShopSize getSortParams={getSortParams} sizes={sizes} />

      {/* filter by star */}
      <ShopStar getFilterSortParams={getFilterSortParams} />

      {/* filter by price */}
      <ShopPrice getFilterSortParams={getFilterSortParams} />

      {/* filter by brand */}
      <ShopBrand brands={brands} getSortParams={getSortParams} />

      {/* filter by tag */}
      <ShopTag subs={subs} getSortParams={getSortParams} />
    </div>
  )
}

ShopSidebar.propTypes = {
  sideSpaceClass: PropTypes.string,
}

export default ShopSidebar
