import PropTypes from 'prop-types'
import React, { Fragment, useEffect } from 'react'
import MetaTags from 'react-meta-tags'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  userChangePasswordAction,
  userProfileAction,
  userProfileUpdateAction,
} from '../../redux/actions/userActions'
import { addAddressAction } from '../../redux/actions/addressAction'
import { useToasts } from 'react-toast-notifications'

const MyAccount = ({ location, history }) => {
  const { addToast } = useToasts()
  const { pathname } = location
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [values, setValues] = useState({
    fullname: '',
    wards: '',
    district: '',
    city: '',
    address: '',
    company: '',
    phone: '',
    email: '',
  })

  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)

  const { user } = useSelector((state) => state.userProfile)

  const handleUpdateProfile = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return addToast('Password and confirm password not match', {
        autoDismiss: true,
        appearance: 'error',
        autoDismissTimeout: 1000,
      })
    }
    dispatch(
      userProfileUpdateAction(addToast, {
        firstName,
        lastName,
        email,
        phone,
        address,
      }),
    )
  }

  const changePasswordHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      return addToast('Password and confirm password not match', {
        autoDismiss: true,
        appearance: 'error',
        autoDismissTimeout: 1000,
      })
    }
    dispatch(userChangePasswordAction(addToast, password, oldPassword))
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/')
    } else {
      if (!user) {
        dispatch(userProfileAction(addToast))
      } else {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
        setAddress(user.address)
        setPhone(user.phone)
      }
    }
  }, [dispatch, addToast, userInfo, history, user])

  const submitHandle = (values, addToast) => {
    dispatch(addAddressAction(values, addToast))
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Flone | My Account</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        My Account
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Edit your account information{' '}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>My Account Information</h4>
                              <h5>Your Personal Details</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>First Name</label>
                                  <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) =>
                                      setFirstName(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Last Name</label>
                                  <input
                                    value={lastName}
                                    type="text"
                                    onChange={(e) =>
                                      setLastName(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Email Address</label>
                                  <input
                                    value={email}
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Telephone</label>
                                  <input
                                    value={phone}
                                    type="text"
                                    onChange={(e) => setPhone(e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button
                                  onClick={handleUpdateProfile}
                                  type="submit"
                                >
                                  Continue
                                </button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> Change your password
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Change Password</h4>
                              <h5>Your Password</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Your password</label>
                                  <input
                                    type="password"
                                    onChange={(e) =>
                                      setOldPassword(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>New Password</label>
                                  <input
                                    type="password"
                                    onChange={(e) =>
                                      setPassword(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Password Confirm</label>
                                  <input
                                    type="password"
                                    onChange={(e) =>
                                      setConfirmPassword(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button
                                  type="submit"
                                  onClick={changePasswordHandler}
                                >
                                  Continue
                                </button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="2">
                          <h3 className="panel-title">
                            <span>3 .</span> Address Book{' '}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Full Name</label>
                                  <input
                                    type="text"
                                    onChange={(e) =>
                                      setValues({
                                        ...values,
                                        fullname: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Email</label>
                                  <input
                                    type="email"
                                    onChange={(e) =>
                                      setValues({
                                        ...values,
                                        email: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Wards</label>
                                  <input
                                    type="text"
                                    onChange={(e) =>
                                      setValues({
                                        ...values,
                                        wards: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>District</label>
                                  <input
                                    type="text"
                                    onChange={(e) =>
                                      setValues({
                                        ...values,
                                        district: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>City</label>
                                  <input
                                    type="text"
                                    onChange={(e) =>
                                      setValues({
                                        ...values,
                                        city: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Address</label>
                                  <textarea
                                    onChange={(e) =>
                                      setValues({
                                        ...values,
                                        address: e.target.value,
                                      })
                                    }
                                    style={{ background: '#fff' }}
                                  ></textarea>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Company</label>
                                  <div
                                    className="form-group d-flex"
                                    style={{ alignItems: 'center' }}
                                  >
                                    <input
                                      type="radio"
                                      value="home"
                                      onChange={(e) =>
                                        setValues({
                                          ...values,
                                          company: e.target.value,
                                        })
                                      }
                                      name="company"
                                      className="form-control"
                                      style={{ width: '16px', height: '16px' }}
                                    />{' '}
                                    <span style={{ marginLeft: '6px' }}>
                                      Home
                                    </span>
                                    <input
                                      type="radio"
                                      name="company"
                                      className="form-control"
                                      onChange={(e) =>
                                        setValues({
                                          ...values,
                                          company: e.target.value,
                                        })
                                      }
                                      value="At work"
                                      style={{
                                        width: '16px',
                                        height: '16px',
                                        marginLeft: '10px',
                                      }}
                                    />{' '}
                                    <span style={{ marginLeft: '6px' }}>
                                      At work
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Phone</label>
                                  <input
                                    type="text"
                                    onChange={(e) =>
                                      setValues({
                                        ...values,
                                        phone: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button
                                  style={{ borderRadius: '5px' }}
                                  type="submit"
                                  onClick={() => submitHandle(values, addToast)}
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  )
}

MyAccount.propTypes = {
  location: PropTypes.object,
}

export default MyAccount
