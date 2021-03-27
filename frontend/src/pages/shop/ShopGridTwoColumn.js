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
import { useDispatch, useSelector } from 'react-redux'
import { listProductAction } from '../../redux/actions/productActions';
import { listCategories } from '../../redux/actions/categoryActions';
import { listSub } from '../../redux/actions/subActions';

const ShopGridTwoColumn = ({ location }) => {
  const [layout, setLayout] = useState('grid two-column')

  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentData, setCurrentData] = useState([])
  const { pathname } = location;
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.listProduct);
  const { categories } = useSelector((state) => state.listCategories)

  const getLayout = (layout) => {
    setLayout(layout)
  }

  useEffect(() => {
    dispatch(listProductAction());
    dispatch(listCategories());
    dispatch(listSub())
  }, [])

  const colors = ['black', 'brown', 'green', 'white', 'blue']
  // useEffect(() => {

  // }, [offset, products, sortType, sortValue, filterSortType, filterSortValue])

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
                <ShopSidebar sideSpaceClass="mr-30" colors={colors} categories={categories} />
              </div>
              <div className="col-lg-9">
                {/* shop topbar default */}
                <ShopTopbar getLayout={getLayout} />

                {/* shop page content default */}
                <ShopProducts products={products} layout={layout} />

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  {/* <Paginator
                    totalRecords={sortedProducts.length}
                    page={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  /> */}
                  {/* <Paginator
                    totalRecords={5}
                    page={3}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  /> */}
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
