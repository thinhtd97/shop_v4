import PropTypes from 'prop-types'
import React, { Fragment, useEffect } from 'react'
import MetaTags from 'react-meta-tags'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { addShippingAddressAction } from '../../redux/actions/cartActions'

const UpdateDelivery = ({ location }) => {
  const { pathname } = location
  const dispatch = useDispatch()

  const history = useHistory()
  const { userInfo } = useSelector((state) => state.userLogin)
  const { address } = useSelector((state) => state.listAddress)
  const handleShippingAddress = (shippingAddress) => {
    dispatch(addShippingAddressAction(shippingAddress))
  }
  useEffect(() => {
    if (!userInfo) {
      history.push('/login-register')
    }
  }, [userInfo, history])
  return (
    <Fragment>
      <MetaTags>
        <title>Shop | Update Shipping Address</title>
        <meta
          name="description"
          content="Cart page of shop react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Update Shipping Address
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-30 pb-100">
          <div className="container">
            <Fragment>
              <div className="row" style={{ display: 'flex' }}>
                {address &&
                  address.map((shippingAddress, key) => (
                    <div key={key} className="col-lg-6 col-md-10">
                      <div className="discount-code-wrapper">
                        <div className="title-wrap">
                          <h4 className="cart-bottom-title section-bg-gray">
                            Delivery Address
                          </h4>
                        </div>
                        <div className="discount-code">
                          <div className="form-group">
                            <div style={{ marginTop: '16px' }}>
                              <ul>
                                <li style={{ marginBottom: '10px' }}>
                                  {shippingAddress.fullname} |{' '}
                                  {shippingAddress.phone}
                                </li>
                                <li>
                                  Address:{shippingAddress.address}, {shippingAddress.wards},{' '}
                                  {shippingAddress.district},{' '}
                                  {shippingAddress.city}
                                </li>
                              </ul>
                            </div>
                            <div style={{ display: 'flex', marginTop: '16px' }}>
                              <Link
                                onClick={() =>
                                  handleShippingAddress(shippingAddress)
                                }
                                style={{ marginRight: '8px' }}
                                to="/checkout"
                                className="btn btn-info btn-sm"
                              >
                                Shipping To This Address
                              </Link>
                              {shippingAddress.active === true ? (
                                ''
                              ) : (
                                <button
                                  style={{ marginRight: '8px' }}
                                  className="btn btn-outline-danger btn-sm"
                                >
                                  Delete
                                </button>
                              )}

                              <Link
                                to={`/detail-address/${shippingAddress.addressId}`}
                                className="btn btn-outline-secondary btn-sm"
                              >
                                Edit
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Fragment>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  )
}

UpdateDelivery.propTypes = {
  currency: PropTypes.object,
  location: PropTypes.object,
  removeAllItem: PropTypes.func,
  removeItem: PropTypes.func,
}

export default UpdateDelivery
