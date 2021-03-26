import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategoryAction, listCateAction } from '../../redux/action/CateAction.js'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import {
  DeleteOutlined,
  FileSyncOutlined,
  LoadingOutlined,
} from '@ant-design/icons'

const { Search } = Input

const ListCate = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const { categories, loading } = useSelector((state) => state.cateList)
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
      title: 'Action',
      key: 'action',
      render: (value) => (
        <Space>
          <Button type="primary">
            <Link to={`/category/update/${value.slug}`}>
              <FileSyncOutlined />
            </Link>
          </Button>
          <Button type="danger" onClick={() => handleRemove(value.slug)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ]
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  const data = categories
    ?.filter(searched(keyword))
    .map((row) => ({ name: row.name, slug: row.slug, key: row._id }))
  const handleRemove = (slug) => {
    dispatch(deleteCategoryAction(slug))
  }
  const dispatch = useDispatch()
  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    }
    dispatch(listCateAction())
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
        <Breadcrumb.Item>List Category</Breadcrumb.Item>
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
        pagination={{ pageSize: 4, current: (categories?.length - 1) }}
      />
    </>
  )
}

export default ListCate
