import React, { Fragment, useEffect, useState } from 'react'
import MetaTags from 'react-meta-tags'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import {
  detailAddressAction,
  updateAddressAction,
} from '../../redux/actions/addressAction'
import { useToasts } from 'react-toast-notifications'
import NotFoundComponent from '../../components/NotFoundComponent'

const DetailAddress = ({ location, match, history }) => {
  const { pathname } = location
  const dispatch = useDispatch()
  const { addToast } = useToasts()
  const addressId = match.params.addressId
  const { addressOne, address: addressData } = useSelector(
    (state) => state.listAddress,
  )
  const { userInfo } = useSelector((state) => state.userLogin)

  const [values, setValues] = useState({
    email: '',
    fullname: '',
    wards: '',
    district: '',
    addressId: '',
    company: '',
    phone: '',
    address: '',
    city: '',
    active: '',
  })
  const handleSubmit = (e, values, addToast) => {
    e.preventDefault()
    dispatch(updateAddressAction(values, addToast))
  }
  useEffect(() => {
    if (!userInfo) {
      history.push('/login-register')
    } else {
      if (
        !addressOne ||
        !addressOne.wards ||
        addressOne?.addressId !== addressId
      ) {
        dispatch(detailAddressAction(addressId))
      } else {
        setValues({
          email: addressOne.email,
          fullname: addressOne.fullname,
          wards: addressOne.wards,
          addressId: addressOne.addressId,
          district: addressOne.district,
          company: addressOne.company,
          phone: addressOne.phone,
          address: addressOne.address,
          city: addressOne.city,
          active: addressOne.active,
        })
      }
    }
  }, [addressId, dispatch, addressOne, userInfo, history])
  return (
    <Fragment>
      <MetaTags>
        <title>Shop | Address</title>
        <meta
          name="description"
          content="Checkout page of shop react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Address
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        {!addressOne ? (
          <NotFoundComponent />
        ) : (
          <div className="checkout-area pt-95 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 ml-auto mr-auto">
                  <div className="billing-info-wrap">
                    <h3>Edit Address</h3>
                    <form onSubmit={(e) => handleSubmit(e, values, addToast)}>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Full Name</label>
                            <input
                              required
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  fullname: e.target.value,
                                })
                              }
                              type="text"
                              value={values.fullname}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Email</label>
                            <input
                              required
                              type="text"
                              onChange={(e) =>
                                setValues({ ...values, email: e.target.value })
                              }
                              value={values.email}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Ward</label>
                            <input
                              required
                              type="text"
                              onChange={(e) =>
                                setValues({ ...values, wards: e.target.value })
                              }
                              value={values.wards}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>District</label>
                            <input
                              required
                              type="text"
                              value={values.district}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  district: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-select mb-20">
                            <label>Company</label>
                            <select
                              required
                              value={values.company}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  company: e.target.value,
                                })
                              }
                            >
                              <option value="At work">At work</option>
                              <option value="home">Home</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Phone</label>
                            <input
                              required
                              type="text"
                              value={values.phone}
                              onChange={(e) =>
                                setValues({ ...values, phone: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>Street Address</label>
                            <textarea
                              required
                              value={values.address}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  address: e.target.value,
                                })
                              }
                              style={{
                                background: '#fff',
                                border: '1px solid lightgray',
                              }}
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>City</label>
                            <input
                              required
                              type="text"
                              value={values.city}
                              onChange={(e) =>
                                setValues({ ...values, city: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div
                            className="billing-info mb-20"
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <label>Default:</label>
                            <input
                              checked={values.active}
                              type="checkbox"
                              style={{
                                width: '14px',
                                marginLeft: '20px',
                                marginBottom: '8px',
                              }}
                              onChange={(e) =>
                                setValues({
                                  ...values,
                                  active: e.target.checked,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        style={{ marginTop: '20px' }}
                        className="btn btn-outline-secondary"
                      >
                        Update
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </LayoutOne>
    </Fragment>
  )
}

export default DetailAddress
