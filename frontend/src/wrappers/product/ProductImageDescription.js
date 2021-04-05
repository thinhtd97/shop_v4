import PropTypes from 'prop-types'
import React from 'react'
import { useToasts } from 'react-toast-notifications'
import { getDiscountPrice } from '../../helpers/product'
import ProductImageGallery from '../../components/product/ProductImageGallery'
import ProductDescriptionInfo from '../../components/product/ProductDescriptionInfo'
import ProductImageGallerySideThumb from '../../components/product/ProductImageGallerySideThumb'
import ProductImageFixed from '../../components/product/ProductImageFixed'
import { useSelector } from 'react-redux'

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  galleryType,
  product,
}) => {
  const { addToast } = useToasts()

  const { wishlist } = useSelector((state) => state.wishListData)

  const discountedPrice = product.discount
    ? getDiscountPrice(product.price, product.discount)
    : 0

  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ''} ${
        spaceBottomClass ? spaceBottomClass : ''
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
            {/* product image gallery */}
            {galleryType === 'leftThumb' ? (
              <ProductImageGallerySideThumb
                product={product}
                thumbPosition="left"
              />
            ) : galleryType === 'rightThumb' ? (
              <ProductImageGallerySideThumb product={product} />
            ) : galleryType === 'fixedImage' ? (
              <ProductImageFixed product={product} />
            ) : (
              <ProductImageGallery product={product} />
            )}
          </div>
          <div className="col-xs-12 col-sm-12 col-lg-6 col-md-6">
            {/* product description info */}
            <ProductDescriptionInfo
              product={product}
              discountedPrice={discountedPrice}
              addToast={addToast}
              wishlistItem={wishlist.filter((item) => item._id === product._id)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

ProductImageDescription.propTypes = {
  galleryType: PropTypes.string,
  product: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
}

export default ProductImageDescription
