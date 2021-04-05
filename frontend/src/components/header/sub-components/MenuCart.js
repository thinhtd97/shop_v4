import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import EmptyCart from '../../../assets/empty-cart.png'
const MenuCart = ({ cartItems, removeFromCart }) => {
  let cartToTalPrice = 0
  const { addToast } = useToasts()
  return (
    <div className="shopping-cart-content">
      <Fragment>
        <ul>
          {cartItems &&
            cartItems.map((item, key) => {
              item.priceDiscount !== 0
                ? (cartToTalPrice += item.priceDiscount * item.qty)
                : (cartToTalPrice += item.price * item.qty)
              return (
                <li key={key} className="single-shopping-cart">
                  <div className="shopping-cart-img">
                    <Link to="#">
                      <img alt="" src={item.image} className="img-fluid" />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link to={`/product/${item.slug}`}> {item.name}</Link>
                    </h4>
                    <h6>
                      Quantity:{' '}
                      <span className="badge badge-info">{item.qty}</span>
                    </h6>
                    <span className="badge badge-success">
                      $
                      {item.priceDiscount !== 0
                        ? item.priceDiscount?.toFixed(2)
                        : item.price?.toFixed(2)}
                    </span>

                    {item.color !== '' ||
                      (item.size !== '' && (
                        <div className="cart-item-variation">
                          {item.color && <span>Color: {item.color}</span>}

                          {item.size && <span>Size: {item.size}</span>}
                        </div>
                      ))}
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={() => removeFromCart(item, addToast)}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              )
            })}
        </ul>

        {cartItems.length === 0 ? (
          // <p style={{ marginTop: '-20px' }} className="text-center">
          //   No items added to cart
          // </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img width={420} src={EmptyCart} alt="empty cart" />
          </div>
        ) : (
          <div>
            <div className="shopping-cart-total">
              <h4>
                Total :{' '}
                <span className="shop-total">${cartToTalPrice.toFixed(2)}</span>
              </h4>
            </div>
            <div className="shopping-cart-btn btn-hover text-center">
              <Link className="default-btn" to="/cart">
                view cart
              </Link>
              <Link className="default-btn" to="/checkout">
                checkout
              </Link>
            </div>
          </div>
        )}
      </Fragment>
    </div>
  )
}

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  removeFromCart: PropTypes.func,
}

export default MenuCart
