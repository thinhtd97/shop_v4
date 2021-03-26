import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { listSubAction, deleteSubAction } from '../../redux/action/subAction.js'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import {
  DeleteOutlined,
  FileSyncOutlined,
  LoadingOutlined,
} from '@ant-design/icons'

const { Search } = Input

const ListSub = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const { subs, loading } = useSelector((state) => state.subList)
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Parent',
      dataIndex: 'parent',
      key: 'parent',
    },
    {
      title: 'Action',
      key: 'action',
      render: (value) => (
        <Space>
          <Button type="primary">
            <Link to={`/sub-category/update/${value.slug}`}>
              <FileSyncOutlined />
            </Link>
          </Button>
          <Button
            type="danger"
            onClick={() => handleRemove(value.slug)}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ]
  const handleRemove = (slug) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteSubAction(slug))
    }
  }
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  const data = subs?.filter(searched(keyword))
    .map((row) => ({
      name: row.name,
      slug: row.slug,
      parent: row.parent?.name,
      key: row._id,
    }))

  const dispatch = useDispatch()
  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    }
    dispatch(listSubAction())
  }, [dispatch, adminInfo, history])
  const handleSearchChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>List Sub Category</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Search
        placeholder="Search"
        size="large"
        style={{ width: 300 }}
        onChange={handleSearchChange}
      />
      <Table
        loading={{ indicator: antIcon, spinning: loading }}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 4, current: (subs?.length - 1) }}
      />
    </>
  )
}

export default ListSub
