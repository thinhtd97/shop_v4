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
                    <Route path="/change-password" component={ChangePassword} exact />
                    <Route path="/my-account" component={MyAccount} exact />
                    <Route path="*" component={NotFound} />
                  </Switch>
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
              </Footer>
            </Layout>
          </Layout>
        </Route>
   
      </Switch>
    </Router>
  )
}

export default App
