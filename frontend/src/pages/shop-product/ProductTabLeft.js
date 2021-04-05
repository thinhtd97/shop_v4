import PropTypes from 'prop-types'
import React, { Fragment, useEffect } from 'react'
import MetaTags from 'react-meta-tags'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import RelatedProductSlider from '../../wrappers/product/RelatedProductSlider'
import ProductDescriptionTab from '../../wrappers/product/ProductDescriptionTab'
import ProductImageDescription from '../../wrappers/product/ProductImageDescription'
import { useDispatch, useSelector } from 'react-redux'
import { detailProductAction } from '../../redux/actions/productActions'

const ProductTabLeft = ({ location, match }) => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const { pathname } = location
  const slug = match.params.slug
  const { product, loading } = useSelector((state) => state.detailProduct)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(detailProductAction(slug))
  }, [dispatch, slug])
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Product Page</title>
        <meta
          name="description"
          content="Product page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop Product
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '30px',
            }}
          >
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {product && (
              <ProductImageDescription
                spaceTopClass="pt-100"
                spaceBottomClass="pb-100"
                product={product}
                galleryType="leftThumb"
              />
            )}

            {/* product description tab */}
            <ProductDescriptionTab
              spaceBottomClass="pb-90"
              productFullDesc={product?.description}
              product={product}
              userInfo={userInfo}
            />
            {/* related product slider */}
            {/* <RelatedProductSlider
spaceBottomClass="pb-95"
category={product.category[0]}
/> */}
          </>
        )}

        {/* product description with image */}
      </LayoutOne>
    </Fragment>
  )
}

ProductTabLeft.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object,
}

export default ProductTabLeft
