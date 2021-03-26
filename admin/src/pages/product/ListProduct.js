import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Input, Image, Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  listProductAction,
  deleteProductAction,
} from '../../redux/action/ProductAction.js'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import {
  DeleteOutlined,
  FileSyncOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
  OrderedListOutlined
} from '@ant-design/icons'

const { Search } = Input

const ListProduct = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const { products, loading } = useSelector((state) => state.productList)
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (value) => (
        <Image style={{ maxWidth: '150px' }} src={value} alt="Image Products" />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },

    {
      title: 'Action',
      key: 'action',
      render: (value) => (
        <Space>
          <Button type="primary">
            <Link to={`/product/update/${value.slug}`}>
              <FileSyncOutlined />
            </Link>
          </Button>
          <Button type="danger" onClick={() => handleRemove(value.slug)}>
            <DeleteOutlined />
          </Button>
          <Button type="ghost">
            <Link to={`/product/create-variation/${value.key}`}>
              <PlusCircleOutlined />
            </Link>
          </Button>
          <Button type="ghost">
            <Link to={`/product/list-variation/${value.slug}`}>
              <OrderedListOutlined />
            </Link>
          </Button>
        </Space>
      ),
    },
  ]
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  const data = products?.filter(searched(keyword)).map((row) => ({
    image: row.image[row.image.length - 1].url,
    name: row.name,
    slug: row.slug,
    discount: row.discount,
    price: row.price,
    variation: row.variation,
    key: row._id,
  }))
  const handleRemove = (slug) => {
    dispatch(deleteProductAction(slug))
  }
  const dispatch = useDispatch()
  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    }
    dispatch(listProductAction())
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
        <Breadcrumb.Item>List Product</Breadcrumb.Item>
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
        pagination={{ pageSize: 4, total: (products?.length - 1) }}
      />
   
    </>
  )
}

export default ListProduct
