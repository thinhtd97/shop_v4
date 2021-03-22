import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const Dashboard = ({ history }) => {
  const { adminInfo } = useSelector((state) => state.adminLogin)
  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    }
  }, [adminInfo, history])
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <hr />
    </>
  )
}

export default Dashboard
