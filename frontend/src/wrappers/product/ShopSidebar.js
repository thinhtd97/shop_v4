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
  getFilterColorParams,
  getFilterSizeParams,
  getFilterPriceParams,
  getCateFilterParams,
  getStarFilterParams,
  getFilterBrandParams,
  getFilterTagsParams,
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
      <ShopCategories
        categories={categories}
        getCateFilterParams={getCateFilterParams}
      />

      {/* filter by color */}
      <ShopColor colors={colors} getFilterColorParams={getFilterColorParams} />

      {/* filter by size */}
      <ShopSize getFilterSizeParams={getFilterSizeParams} sizes={sizes} />

      {/* filter by star */}
      <ShopStar getStarFilterParams={getStarFilterParams} />

      {/* filter by price */}
      <ShopPrice getFilterPriceParams={getFilterPriceParams} />

      {/* filter by brand */}
      <ShopBrand brands={brands} getFilterBrandParams={getFilterBrandParams} />

      {/* filter by tag */}
      <ShopTag subs={subs} getFilterTagsParams={getFilterTagsParams} />
    </div>
  )
}

ShopSidebar.propTypes = {
  sideSpaceClass: PropTypes.string,
}

export default ShopSidebar
