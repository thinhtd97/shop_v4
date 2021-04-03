import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import ProductGridSingleFive from '../../components/product/ProductGridSingleFive'
const ProductGridFive = ({
  currency,
  sliderClassName,
  products,
  spaceBottomClass,
}) => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const { cartItems } = useSelector((state) => state.cart)
  const { cartItems: cartItemsDatabase } = useSelector(
    (state) => state.listCart,
  )
  const finalCartItems = userInfo ? cartItemsDatabase : cartItems

  const { wishlist } = useSelector((state) => state.wishListData)

  return (
    <Fragment>
      {products &&
        products.map((product, key) => (
          <ProductGridSingleFive
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            currency={currency}
            product={product}
            userInfo={userInfo}
            key={key}
            cartItem={
              finalCartItems.filter((el) => el.product === product._id)[0]
            }
            wishlistItem={wishlist.filter((el) => el._id === product._id)[0]}
          />
        ))}
    </Fragment>
  )
}

ProductGridFive.propTypes = {
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array,
}

export default ProductGridFive
