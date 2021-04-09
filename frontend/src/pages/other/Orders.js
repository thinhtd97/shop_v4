import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaTags from 'react-meta-tags'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import { orderListAction } from '../../redux/actions/orderAction'

const Orders = ({ location, history }) => {
  const { userInfo } = useSelector((state) => state.userLogin)
  const { orders } = useSelector((state) => state.orderList)
  const { pathname } = location
  const dispatch = useDispatch()
  useEffect(() => {
    if (!userInfo) {
      history.push('/login-register')
    }
    dispatch(orderListAction())
  }, [userInfo, history, dispatch])
  return (
    <Fragment>
      <MetaTags>
        <title>Shop | Orders</title>
        <meta
          name="description"
          content="Cart page of shop react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Your Orders
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            <Fragment>
              <div className="row">
                <div className="col-12">
                  <div
                    className="table-content table-responsive cart-table-content"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    {' '}
                    <h3 className="mb-30">Your Orders</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>User</th>
                          <th>Date</th>
                          <th>Product</th>
                          <th>Total</th>
                          <th>Paid</th>
                          <th>Delivered</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders &&
                          orders.map((item, key) => (
                            <tr key={key}>
                              <td>
                                <Link to={`/order/${item.orderId}`}>
                                  {' '}
                                  {item.orderId}
                                </Link>
                              </td>
                              <td>{item.shippingAddress.fullname}</td>
                              <td>{item.createdAt.substring(0, 10)}</td>
                              <td style={{ display: 'flex', flexWrap: 'wrap' }}>
                                <span>
                                  {item.orderItems.map(
                                    (item) => `${item.name},`,
                                  )}
                                </span>
                              </td>
                              <td>${item.totalPrice.toFixed(2)}</td>
                              <td>
                                {item.isPaid ? (
                                  <i
                                    className="fa fa-check"
                                    style={{ color: 'green' }}
                                  ></i>
                                ) : (
                                  <i
                                    className="fa fa-times"
                                    style={{ color: 'red' }}
                                  ></i>
                                )}
                              </td>
                              <td>
                                {item.isDelivery ? (
                                  <i
                                    className="fa fa-check"
                                    style={{ color: 'green' }}
                                  ></i>
                                ) : (
                                  <i
                                    className="fa fa-times"
                                    style={{ color: 'red' }}
                                  ></i>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                      {/* 
                          <td className="product-remove">
                            <button>
                              <i className="fa fa-times"></i>
                            </button>

                            <button>
                              <i className="fa fa-times"></i>
                            </button>
                          </td> */}
                    </table>
                  </div>
                </div>
              </div>
            </Fragment>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  )
}

export default Orders
