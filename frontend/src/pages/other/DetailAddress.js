import React, { Fragment, useEffect, useState } from 'react'
import MetaTags from 'react-meta-tags'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import { detailAddressAction } from '../../redux/actions/addressAction'

const DetailAddress = ({ location, match, history }) => {
  const { pathname } = location
  const dispatch = useDispatch()
  const addressId = match.params.addressId
  const { addressOne, address: addressData } = useSelector(
    (state) => state.listAddress,
  )
  const { userInfo } = useSelector((state) => state.userLogin)
  const [fullname, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [ward, setWard] = useState('')
  const [district, setDistrict] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [active, setActive] = useState('')
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
        setFullName(addressOne.fullname)
        setEmail(addressOne.email)
        setWard(addressOne.wards)
        setDistrict(addressOne.district)
        setCompany(addressOne.company)
        setAddress(addressOne.address)
        setCity(addressOne.city)
        setPhone(addressOne.phone)
        setActive(addressOne.active)
      }
    }
  }, [addressId, dispatch, addressOne, userInfo, history])
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Address</title>
        <meta
          name="description"
          content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Address
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 ml-auto mr-auto">
                <div className="billing-info-wrap">
                  <h3>Edit Address</h3>
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20">
                        <label>Full Name</label>
                        <input
                          onChange={(e) => setFullName(e.target.value)}
                          type="text"
                          value={fullname}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20">
                        <label>Email</label>
                        <input
                          type="text"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20">
                        <label>Ward</label>
                        <input
                          type="text"
                          onChange={(e) => setWard(e.target.value)}
                          value={ward}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-info mb-20">
                        <label>District</label>
                        <input
                          type="text"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-select mb-20">
                        <label>Company</label>
                        <select
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
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
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="billing-info mb-20">
                        <label>Street Address</label>
                        <textarea
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
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
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div
                        className="billing-info mb-20"
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <label>Default:</label>
                        {addressData.length < 2 ? (
                          <input
                            disabled
                            checked={active}
                            type="checkbox"
                            style={{
                              width: '14px',
                              marginLeft: '20px',
                              marginBottom: '8px',
                            }}
                            value={city}
                            onChange={(e) => setActive(e.target.checked)}
                          />
                        ) : (
                          <input
                            checked={active}
                            type="checkbox"
                            style={{
                              width: '14px',
                              marginLeft: '20px',
                              marginBottom: '8px',
                            }}
                            value={city}
                            onChange={(e) => setActive(e.target.checked)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    style={{ marginTop: '20px' }}
                    className="btn btn-outline-secondary"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  )
}

export default DetailAddress
