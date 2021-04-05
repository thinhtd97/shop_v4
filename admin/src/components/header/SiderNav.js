import React from 'react'
import { Layout, Menu } from 'antd'
import {
  InsertRowRightOutlined,
  UserOutlined,
  DashboardOutlined,
  SisternodeOutlined,
  AppstoreAddOutlined,
  LogoutOutlined,
  DollarCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutAdminAction } from '../../redux/action/userAdminAction'

const { Sider } = Layout
const { SubMenu } = Menu

const SiderNav = () => {
  const siderOption = {
    breakpoint: 'lg',
    collapsedWidth: '0',
  }
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(logoutAdminAction())
  }
  const { adminInfo } = useSelector((state) => state.adminLogin)
  return (
    <Sider {...siderOption}>
      <div className="logo" />
      <Menu theme="dark" mode="inline">
        {adminInfo ? (
          <Menu.Item key="admin_name" icon={<UserOutlined />}>
            <Link to="/my-account">{`${adminInfo.firstName} ${adminInfo.lastName}`}</Link>
          </Menu.Item>
        ) : null}

        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <SubMenu
          key="product"
          icon={<InsertRowRightOutlined />}
          title="Product"
        >
          <Menu.Item key="create-product">
            <Link to="/product/create-product">Create</Link>
          </Menu.Item>
          <Menu.Item key="list-product">
            <Link to="/product/list-products">List</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="category" icon={<SisternodeOutlined />} title="Category">
          <Menu.Item key="create-category">
            <Link to="/category/create-category">Create</Link>
          </Menu.Item>
          <Menu.Item key="list-categories">
            <Link to="/category/list-categories">List</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub-category"
          icon={<AppstoreAddOutlined />}
          title="Sub Category"
        >
          <Menu.Item key="create-sub-category">
            <Link to="/sub-category/create-sub-category">Create</Link>
          </Menu.Item>
          <Menu.Item key="list-sub-categories">
            <Link to="/sub-category/list-sub-catgories">List</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="coupon" icon={<DollarCircleOutlined />} title="Coupon">
          <Menu.Item key="create-coupon">
            <Link to="/coupon/create-coupon">Create</Link>
          </Menu.Item>
          <Menu.Item key="list-coupon">
            <Link to="/coupon/list-coupons">List</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="change-password" icon={<SyncOutlined />}>
          <Link to="/change-password">Change Password</Link>
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          <Link to="#" onClick={logout}>
            Logout
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SiderNav
