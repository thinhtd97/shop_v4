import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
const MenuCart = () => {
  return (
    <div className="shopping-cart-content">
      <Fragment>
        <ul>
          <li className="single-shopping-cart">
            <div className="shopping-cart-img">
              <Link to="#">
                <img
                  alt=""
                  src="https://res.cloudinary.com/ducthinh2109/image/upload/v1616672666/pt1ofj5xtbz6itbmhwet.jpg"
                  className="img-fluid"
                />
              </Link>
            </div>
            <div className="shopping-cart-title">
              <h4>
                <Link to="#"> Product 1</Link>
              </h4>
              <h6>Qty: 1</h6>
              <span>$23</span>

              <div className="cart-item-variation">
                <span>Color: red</span>
                <span>Size: S</span>
              </div>
            </div>
            <div className="shopping-cart-delete">
              <button>
                <i className="fa fa-times-circle" />
              </button>
            </div>
          </li>
        </ul>
        <div className="shopping-cart-total">
          <h4>
            Total : <span className="shop-total">$20</span>
          </h4>
        </div>
        <div className="shopping-cart-btn btn-hover text-center">
          <Link className="default-btn" to="#">
            view cart
          </Link>
          <Link className="default-btn" to="#">
            checkout
          </Link>
        </div>
      </Fragment>
      {/* <p className="text-center">No items added to cart</p> */}
    </div>
  )
}

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  removeFromCart: PropTypes.func,
}

export default MenuCart
