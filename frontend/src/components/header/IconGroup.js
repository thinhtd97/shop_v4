import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import MenuCart from './sub-components/MenuCart'
import { removeItem } from '../../redux/actions/cartActions'
import { useSelector } from 'react-redux'
import { logoutAction } from '../../redux/actions/userActions'

const IconGroup = ({ iconWhiteClass }) => {

  const { userInfo } = useSelector((state) => state.userLogin)
  const dispatch = useDispatch()
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle('active')
  }

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector('#offcanvas-mobile-menu')
    offcanvasMobileMenu.classList.add('active')
  }

  const logout = (e) => {
    e.preventDefault()
    dispatch(logoutAction())
  }

  const { cartItems } = useSelector((state) => state.cart)

  const removeCartItem = (item, addToast) => {
    dispatch(removeItem(item, addToast))
  }

  const currency = useSelector((state) => state.currencyData)
  const { wishlist } = useSelector((state) => state.wishListData)

  const { cartItems: cartItemsUser } = useSelector((state) => state.listCart);
  const finalCartItems = userInfo ? cartItemsUser : cartItems; 
  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ''}`}
    >
      {userInfo ? (
        <>
          <div
            style={{ margin: '0' }}
            className="same-style account-setting d-none d-lg-block"
          >
            <button
              className="account-setting-active"
              onClick={(e) => handleClick(e)}
            >
              <i className="pe-7s-user-female" />
            </button>
            <div className="account-dropdown">
              <ul>
                <li>
                  <Link to={process.env.PUBLIC_URL + '/my-account'}>
                    My account
                  </Link>
                </li>
                <li>
                  <Link onClick={logout} to="#">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="same-style header-wishlist">
            <Link to={process.env.PUBLIC_URL + '/wishlist'}>
              <i className="pe-7s-like" />
              <span className="count-style">
                {wishlist && wishlist.length ? wishlist.length : 0}
              </span>
            </Link>
          </div>
        </>
      ) : (
        <div className="same-style account-setting d-none d-lg-block">
          <button
            className="account-setting-active"
            onClick={(e) => handleClick(e)}
          >
            <i className="pe-7s-user-female" />
          </button>
          <div className="account-dropdown">
            <ul>
              <li>
                <Link to={process.env.PUBLIC_URL + '/login-register'}>
                  Login/Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {finalCartItems && finalCartItems.length ? finalCartItems.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart
          cartItems={finalCartItems}
          currency={currency}
          removeFromCart={removeCartItem}
        />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + '/cart'}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {finalCartItems && finalCartItems.length ? finalCartItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  )
}

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  removeFromCart: PropTypes.func,
  wishlistData: PropTypes.array,
}
export default IconGroup
