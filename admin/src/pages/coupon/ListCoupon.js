import React, { useEffect, useState } from 'react'
import { Table, Space, Input, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  listCouponAction,
  removeCouponUsedAction,
} from '../../redux/action/CouponAction.js'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import {
  CheckOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
const { Search } = Input
const ListCoupon = ({ history }) => {
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  const { coupons, loading } = useSelector((state) => state.couponList)
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const searched = (keyword) => (c) => c.code.toLowerCase().includes(keyword)
  const handleSearchChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }
  const removeAllUsedCoupon = () => {
    dispatch(removeCouponUsedAction())
  }
  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Available',
      key: 'available',
      render: (value) => (
        <Space>
          {value.used ? (
            <CloseCircleOutlined style={{ color: 'red' }} />
          ) : (
            <CheckOutlined style={{ color: 'green' }} />
          )}
        </Space>
      ),
    },
  ]
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  const data = coupons?.filter(searched(keyword)).map((row) => ({
    code: row.code,
    discount: row.discount,
    used: row.used,
    key: row._id,
  }))
  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    }
    dispatch(listCouponAction())
  }, [dispatch, adminInfo, history])
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>List Coupon</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Search
        placeholder="Search"
        size="large"
        style={{ width: 300, marginBottom: '10px' }}
        onChange={handleSearchChange}
      />
      <Button
        onClick={() => removeAllUsedCoupon()}
        type="danger"
        style={{ float: 'right' }}
      >
        Remove All Coupon Used
      </Button>
      <Table
        loading={{ indicator: antIcon, spinning: loading }}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 4, total: coupons?.length - 1 }}
      />
    </>
  )
}

export default ListCoupon
