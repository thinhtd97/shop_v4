import React, { Fragment, useEffect, useState } from 'react'
import MetaTags from 'react-meta-tags'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import LoginPage from '../../components/auth/LoginPage'
import { useToasts } from 'react-toast-notifications'
import { registerActionRequest } from '../../redux/actions/userActions'
import LoadingOverlay from 'react-loading-overlay'
import MyLoader from '../../components/MyLoader'

const LoginRegister = ({ location, history }) => {
  const { addToast } = useToasts()
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const registerHandler = (e, values) => {
    e.preventDefault()
    if (values.password !== confirmPassword) {
      return addToast('Password and confirm password not match', {
        autoDismiss: true,
        appearance: 'error',
        autoDismissTimeout: 1000,
      })
    } else if (values.firstName === '') {
      return addToast('First name cannot be empty!', {
        autoDismiss: true,
        appearance: 'error',
        autoDismissTimeout: 1000,
      })
    } else if (values.lastName === '') {
      return addToast('Last name cannot be empty!', {
        autoDismiss: true,
        appearance: 'error',
        autoDismissTimeout: 1000,
      })
    } else if (values.email === '') {
      return addToast('Email name cannot be empty!', {
        autoDismiss: true,
        appearance: 'error',
        autoDismissTimeout: 1000,
      })
    } else if (values.address === '') {
      return addToast('Address cannot be empty!', {
        autoDismiss: true,
        appearance: 'error',
        autoDismissTimeout: 1000,
      })
    } else {
      dispatch(registerActionRequest(values, addToast))
    }
  }
  const { userInfo, loading: loadingLogin } = useSelector(
    (state) => state.userLogin,
  )
  const { loading: loadingRegister } = useSelector(
    (state) => state.userRegister,
  )
  const loading = loadingLogin ? loadingLogin : loadingRegister
  const { pathname } = location
  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])
  return (
    <MyLoader active={loading}>
      <MetaTags>
        <title>Shop | Login</title>
        <meta
          name="description"
          content="Compare page of shop react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <LoginPage />
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={(e) => registerHandler(e, values)}>
                              <input
                                type="text"
                                name="user-firstName"
                                placeholder="Full Name"
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    firstName: e.target.value,
                                  })
                                }
                              />
                              <input
                                type="text"
                                name="user-lastName"
                                placeholder="Full Name"
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    lastName: e.target.value,
                                  })
                                }
                              />
                              <input
                                name="user-email"
                                placeholder="Email"
                                type="email"
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    email: e.target.value,
                                  })
                                }
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Password"
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    password: e.target.value,
                                  })
                                }
                              />
                              <input
                                type="password"
                                name="user-confirm-password"
                                placeholder="Confirm Password"
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                              />
                              <input
                                name="user-phone"
                                placeholder="Phone"
                                type="text"
                                onChange={(e) =>
                                  setValues({
                                    ...values,
                                    phone: e.target.value,
                                  })
                                }
                              />

                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </MyLoader>
  )
}

export default LoginRegister
