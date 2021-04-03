import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import ProductGridListSingle from '../../components/product/ProductGridListSingle'

const ProductGrid = ({ sliderClassName, spaceBottomClass, products }) => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const { cartItems } = useSelector((state) => state.cart)
  const { cartItems: cartItemDatabase } = useSelector((state) => state.listCart)
  const finalCartItems = userInfo ? cartItemDatabase : cartItems
  const { wishlist } = useSelector((state) => state.wishListData)
  return (
    <Fragment>
      {products &&
        products.map((product, key) => (
          <ProductGridListSingle
            key={key}
            product={product}
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            cartItem={
              finalCartItems.filter((el) => el.product === product._id)[0]
            }
            wishlistItem={wishlist.filter((el) => el._id === product._id)[0]}
          />
        ))}
      {products && products.length === 0 && (
        <p style={{ marginLeft: '1em' }}>Product Not Found</p>
      )}
    </Fragment>
  )
}

ProductGrid.propTypes = {
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
}

export default ProductGrid
