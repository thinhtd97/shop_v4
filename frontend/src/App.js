import PropTypes from 'prop-types'
import React, { useEffect, Suspense, lazy } from 'react'
import ScrollToTop from './helpers/scroll-top'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import { multilanguage, loadLanguages } from 'redux-multilanguage'
import { connect } from 'react-redux'
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic'

// home pages
const HomeFashion = lazy(() => import('./pages/home/HomeFashionFour'))

// shop pages
const ShopGridTwoColumn = lazy(() => import('./pages/shop/ShopGridTwoColumn'))

// product pages
const ProductTabLeft = lazy(() => import('./pages/shop-product/ProductTabLeft'))

// other pages
const About = lazy(() => import('./pages/other/About'))
const Contact = lazy(() => import('./pages/other/Contact'))
const MyAccount = lazy(() => import('./pages/other/MyAccount'))
const LoginRegister = lazy(() => import('./pages/other/LoginRegister'))
const ResetPassword = lazy(() => import('./pages/other/ResetPassword'))
const NewPassword = lazy(() => import('./pages/other/NewPassword'))

const Cart = lazy(() => import('./pages/other/Cart'))
const Wishlist = lazy(() => import('./pages/other/Wishlist'))

const Checkout = lazy(() => import('./pages/other/Checkout'))
const DetailAddress = lazy(() => import('./pages/other/DetailAddress'))
const UpdateDelivery = lazy(() => import('./pages/other/UpdateDelivery'))
const OrderDetail = lazy(() => import('./pages/other/OrderDetail'))
const Orders = lazy(() => import('./pages/other/Orders'))

const NotFound = lazy(() => import('./pages/other/NotFound'))

const App = (props) => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require('./translations/english.json'),
          fn: require('./translations/french.json'),
          de: require('./translations/germany.json'),
        },
      }),
    )
  })

  return (
    <>
      <ToastProvider>
        <BreadcrumbsProvider>
          <Router>
            <ScrollToTop>
              <Suspense
                fallback={
                  <div className="flone-preloader-wrapper">
                    <div className="flone-preloader">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                }
              >
                <Switch>
                  <Route
                    exact
                    path={process.env.PUBLIC_URL + '/'}
                    component={HomeFashion}
                  />
                  {/* Shop pages */}
                  <Route
                    path={process.env.PUBLIC_URL + '/shop'}
                    component={ShopGridTwoColumn}
                  />
                  {/* Shop product pages */}
                  <Route
                    path={process.env.PUBLIC_URL + '/product/:slug'}
                    component={ProductTabLeft}
                  />

                  {/* Other pages */}
                  <Route
                    path={process.env.PUBLIC_URL + '/about'}
                    component={About}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + '/contact'}
                    component={Contact}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + '/my-account'}
                    component={MyAccount}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + '/login-register'}
                    component={LoginRegister}
                  />

                  <Route
                    path={process.env.PUBLIC_URL + '/cart'}
                    component={Cart}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + '/wishlist'}
                    component={Wishlist}
                  />

                  <Route
                    path={process.env.PUBLIC_URL + '/checkout'}
                    component={Checkout}
                  />

                  <Route
                    path={process.env.PUBLIC_URL + '/not-found'}
                    component={NotFound}
                  />

                  <Route
                    path={process.env.PUBLIC_URL + '/reset-password'}
                    component={ResetPassword}
                  />

                  <Route
                    path={process.env.PUBLIC_URL + '/reset/:token'}
                    component={NewPassword}
                  />

                  <Route
                    path={process.env.PUBLIC_URL + '/detail-address/:addressId'}
                    component={DetailAddress}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + '/update-delivery'}
                    component={UpdateDelivery}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + '/order/:orderId'}
                    component={OrderDetail}
                  />
                  <Route
                    path={process.env.PUBLIC_URL + '/orders'}
                    component={Orders}
                  />
                  <Route exact component={NotFound} />
                </Switch>
              </Suspense>
            </ScrollToTop>
          </Router>
        </BreadcrumbsProvider>
      </ToastProvider>
    </>
  )
}

App.propTypes = {
  dispatch: PropTypes.func,
}

export default connect()(multilanguage(App))
