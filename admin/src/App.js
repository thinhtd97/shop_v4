import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import 'antd/dist/antd.css'
import './App.css'
import { Layout } from 'antd'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import TopNav from './components/header/TopNav'
import SiderNav from './components/header/SiderNav'
import LoginPage from './pages/auth/LoginPage.js'
import AuthStyle from './assets/AuthStyle.js'
import ChangePassword from './pages/auth/ChangePassword'
import MyAccount from './pages/auth/MyAccount'
import CreateCate from './pages/category/CreateCate'
import NotFoundAuth from './pages/auth/NotFoundAuth'
import ListCate from './pages/category/ListCate'
import UpdateCate from './pages/category/UpdateCate'
import CreateSub from './pages/subCategory/CreateSub'
import ListSub from './pages/subCategory/ListSub'
import UpdateSub from './pages/subCategory/UpdateSub'
import CreateProduct from './pages/product/CreateProduct'
import ListProduct from './pages/product/ListProduct'
import UpdateProduct from './pages/product/UpdateProduct'
import CreateVariation from './pages/product/CreateVariation'
import ListVariation from './pages/product/ListVariation'
import UpdateVariation from './pages/product/UpdateVariation'
import CreateSize from './pages/product/CreateSize'
import ListSize from './pages/product/ListSize'
import UpdateSize from './pages/product/UpdateSize'

const { Content, Footer } = Layout

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/auth/:path?" exact>
          <AuthStyle className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route path="/auth/login" component={LoginPage} />
                <Route path="*" component={NotFoundAuth} />
              </Switch>
            </div>
          </AuthStyle>
        </Route>

        <Route>
          <Layout>
            <SiderNav />
            <Layout>
              <TopNav />
              <Content style={{ margin: '24px 16px 0' }}>
                <div
                  className="site-layout-background"
                  style={{ padding: 24, minHeight: 360 }}
                >
                  <Switch>
                    <Route path="/" component={Dashboard} exact />
                    <Route path="/dashboard" component={Dashboard} exact />
                    <Route
                      path="/change-password"
                      component={ChangePassword}
                      exact
                    />
                    <Route path="/my-account" component={MyAccount} exact />
                    <Route
                      path="/category/create-category"
                      component={CreateCate}
                      exact
                    />
                    <Route
                      path="/category/list-categories"
                      component={ListCate}
                      exact
                    />
                    <Route
                      path="/category/update/:slug"
                      component={UpdateCate}
                      exact
                    />
                    <Route
                      path="/sub-category/create-sub-category"
                      component={CreateSub}
                      exact
                    />
                    <Route
                      path="/sub-category/list-sub-catgories"
                      component={ListSub}
                      exact
                    />
                    <Route
                      path="/sub-category/update/:slug"
                      component={UpdateSub}
                      exact
                    />
                    <Route
                      path="/product/create-product"
                      component={CreateProduct}
                      exact
                    />
                    <Route
                      path="/product/list-products"
                      component={ListProduct}
                      exact
                    />
                    <Route
                      path="/product/update/:slug"
                      component={UpdateProduct}
                      exact
                    />
                    <Route
                      path="/product/create-variation/:id"
                      component={CreateVariation}
                      exact
                    />
                    <Route
                      path="/product/list-variation/:slug"
                      component={ListVariation}
                      exact
                    />
                    <Route
                      path="/variation/update/:slug/:id"
                      component={UpdateVariation}
                      exact
                    />
                    <Route
                      path="/variation/create-size/:id"
                      component={CreateSize}
                      exact
                    />
                    <Route
                      path="/product/list-variation/:slug/:id"
                      component={ListSize}
                      exact
                    />
                    <Route
                      path="/product/list-variation/update-size/:variationId/:sizeId"
                      component={UpdateSize}
                      exact
                    />
                    <Route path="*" component={NotFound} />
                  </Switch>
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Copyright &copy; 2021
              </Footer>
            </Layout>
          </Layout>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
