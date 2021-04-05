import PropTypes from 'prop-types'
import React, { Fragment, useState, useEffect } from 'react'
import MetaTags from 'react-meta-tags'
import Paginator from 'react-hooks-paginator'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import ShopSidebar from '../../wrappers/product/ShopSidebar'
import ShopTopbar from '../../wrappers/product/ShopTopbar'
import ShopProducts from '../../wrappers/product/ShopProducts'
import { useSelector } from 'react-redux'
import { getSortedProducts } from '../../helpers/product'

const ShopGridTwoColumn = ({ location }) => {
  const [layout, setLayout] = useState('grid two-column')

  const [sortType, setSortType] = useState('')
  const [sortValue, setSortValue] = useState('')

  const [filterSortType, setFilterSortType] = useState('')
  const [filterSortValue, setFilterSortValue] = useState('')

  const [filterPriceSortType, setFilterPriceSortType] = useState('')
  const [filterPriceSortValue, setFilterPriceSortValue] = useState('')

  const [filterCateSortType, setFilterCateSortType] = useState('')
  const [filterCateSortValue, setFilterCateSortValue] = useState('')

  const [filterStarSortType, setFilterStarSortType] = useState('')
  const [filterStarSortValue, setFilterStarSortValue] = useState('')

  const [filterColorSortType, setFilterColorSortType] = useState('')
  const [filterColorSortValue, setFilterColorSortValue] = useState('')

  const [filterBrandSortType, setFilterBrandSortType] = useState('')
  const [filterBrandSortValue, setFilterBrandSortValue] = useState('')

  const [filterSizeSortType, setFilterSizeSortType] = useState('')
  const [filterSizeSortValue, setFilterSizeSortValue] = useState('')

  const [filterTagsSortType, setFilterTagsSortType] = useState('')
  const [filterTagsSortValue, setFilterTagsSortValue] = useState('')

  const [offset, setOffset] = useState(0)

  const [currentPage, setCurrentPage] = useState(1)
  const [currentData, setCurrentData] = useState([])
  const [sortedProducts, setSortedProducts] = useState([])

  const pageLimit = 8

  const { pathname } = location

  const { products, loading } = useSelector((state) => state.listProduct)
  const { categories } = useSelector((state) => state.listCategories)
  const { subs } = useSelector((state) => state.listSub)

  const getLayout = (layout) => {
    setLayout(layout)
  }

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType)
    setSortValue(sortValue)
  }

  const sizes = ['S', 'M', 'L', 'XL', 'XXL']

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType)
    setFilterSortValue(sortValue)
  }

  const getFilterPriceParams = (sortType, sortValue) => {
    setFilterPriceSortType(sortType)
    setFilterPriceSortValue(sortValue)
  }

  const getFilterTagsParams = (sortType, sortValue) => {
    setFilterTagsSortType(sortType)
    setFilterTagsSortValue(sortValue)
  }

  const getFilterBrandParams = (sortType, sortValue) => {
    setFilterBrandSortType(sortType)
    setFilterBrandSortValue(sortValue)
  }

  const getFilterColorParams = (sortType, sortValue) => {
    setFilterColorSortType(sortType)
    setFilterColorSortValue(sortValue)
  }

  const getFilterSizeParams = (sortType, sortValue) => {
    setFilterSizeSortType(sortType)
    setFilterSizeSortValue(sortValue)
  }

  const getCateFilterParams = (sortType, sortValue) => {
    setFilterCateSortType(sortType)
    setFilterCateSortValue(sortValue)
  }

  const getStarFilterParams = (sortType, sortValue) => {
    setFilterStarSortType(sortType)
    setFilterStarSortValue(sortValue)
  }

  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue)
    const filterSortedProducts = getSortedProducts(
      sortedProducts,
      filterSortType,
      filterSortValue,
    )
    const filterPriceSortedProduct = getSortedProducts(
      filterSortedProducts,
      filterPriceSortType,
      filterPriceSortValue,
    )
    const filterCateSortedProduct = getSortedProducts(
      filterPriceSortedProduct,
      filterCateSortType,
      filterCateSortValue,
    )
    const filterStarSortedProduct = getSortedProducts(
      filterCateSortedProduct,
      filterStarSortType,
      filterStarSortValue,
    )
    const filterColorSortedProduct = getSortedProducts(
      filterStarSortedProduct,
      filterColorSortType,
      filterColorSortValue,
    )
    const filterSizeSortedProduct = getSortedProducts(
      filterColorSortedProduct,
      filterSizeSortType,
      filterSizeSortValue,
    )
    const filterBrandSortedProduct = getSortedProducts(
      filterSizeSortedProduct,
      filterBrandSortType,
      filterBrandSortValue,
    )
    const filterTagsSortedProduct = getSortedProducts(
      filterBrandSortedProduct,
      filterTagsSortType,
      filterTagsSortValue,
    )
    sortedProducts = filterTagsSortedProduct
    setSortedProducts(sortedProducts)
    setCurrentData(sortedProducts?.slice(offset, offset + pageLimit))
  }, [
    offset,
    products,
    sortType,
    sortValue,
    filterSortType,
    filterSortValue,
    filterPriceSortType,
    filterPriceSortValue,
    filterCateSortType,
    filterCateSortValue,
    filterStarSortType,
    filterStarSortValue,
    filterColorSortType,
    filterColorSortValue,
    filterSizeSortType,
    filterSizeSortValue,
    filterBrandSortType,
    filterBrandSortValue,
    filterTagsSortType,
    filterTagsSortValue,
  ])

  const colors = ['black', 'brown', 'green', 'white', 'blue']
  const brands = [
    'Gucci',
    'Louis Vuitton',
    'Chanel',
    'Dior',
    'Armani',
    'Tiffany',
  ]

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Shop Page</title>
        <meta
          name="description"
          content="Shop page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                {/* shop sidebar */}
                <ShopSidebar
                  sideSpaceClass="mr-30"
                  getSortParams={getSortParams}
                  getFilterSortParams={getFilterSortParams}
                  getFilterPriceParams={getFilterPriceParams}
                  getCateFilterParams={getCateFilterParams}
                  getStarFilterParams={getStarFilterParams}
                  getFilterColorParams={getFilterColorParams}
                  getFilterSizeParams={getFilterSizeParams}
                  getFilterBrandParams={getFilterBrandParams}
                  getFilterTagsParams={getFilterTagsParams}
                  categories={categories}
                  colors={colors}
                  sizes={sizes}
                  subs={subs}
                  brands={brands}
                />
              </div>
              <div className="col-lg-9">
                {/* shop topbar default */}
                <ShopTopbar
                  getFilterSortParams={getFilterSortParams}
                  getLayout={getLayout}
                />

                {/* shop page content default */}
                {loading ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <ShopProducts products={currentData} layout={layout} />
                )}

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={sortedProducts ? sortedProducts.length : 1}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  )
}

ShopGridTwoColumn.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
}

export default ShopGridTwoColumn
