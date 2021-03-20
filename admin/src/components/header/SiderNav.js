import React from 'react'
import { Layout, Menu } from 'antd'
import {
  InsertRowRightOutlined,
  UserOutlined,
  DashboardOutlined,
  SisternodeOutlined,
  AppstoreAddOutlined,
  LogoutOutlined,
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
  const dispatch = useDispatch();
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
          <Menu.Item key="create-product">Create</Menu.Item>
          <Menu.Item key="list-product">List</Menu.Item>
        </SubMenu>
        <SubMenu key="category" icon={<SisternodeOutlined />} title="Category">
          <Menu.Item key="create-category">Create</Menu.Item>
          <Menu.Item key="list-categories">List</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub-category"
          icon={<AppstoreAddOutlined />}
          title="Sub Category"
        >
          <Menu.Item key="create-sub-category">Create</Menu.Item>
          <Menu.Item key="list-sub-categories">List</Menu.Item>
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
