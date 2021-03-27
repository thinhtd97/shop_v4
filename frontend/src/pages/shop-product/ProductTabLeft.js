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
  const { pathname } = location
  const slug = match.params.slug
  const { product } = useSelector((state) => state.detailProduct)
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

        {/* product description with image */}
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
        />

        {/* related product slider */}
        {/* <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={product.category[0]}
        /> */}
      </LayoutOne>
    </Fragment>
  )
}

ProductTabLeft.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object,
}

export default ProductTabLeft
