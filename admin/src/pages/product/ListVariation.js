import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Input, Image } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteVariationAction,
  listVariationAction,
} from '../../redux/action/variationAction.js'
import {
  detailProductAction,
} from '../../redux/action/ProductAction'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import {
  DeleteOutlined,
  FileSyncOutlined,
  LoadingOutlined,
} from '@ant-design/icons'

const { Search } = Input

const ListVariation = ({ history, match }) => {
  const [keyword, setKeyword] = useState('')
  const { variations, loading } = useSelector((state) => state.variationList)
  const { product: productDetail } = useSelector((state) => state.productDetail)
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const searched = (keyword) => (c) => c.color.toLowerCase().includes(keyword)
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (value) => (
        <Image src={value} alt={'Image'} style={{ maxWidth: '100px' }} />
      ),
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Parent Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Action',
      key: 'action',
      render: (value) => (
        <Space>
          <Button type="primary">
            <Link to={`/variation/update/${value.key}`}>
              <FileSyncOutlined />
            </Link>
          </Button>
          <Button type="danger" onClick={() => handleRemove(value.key)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ]
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  const data = variations?.filter(searched(keyword)).map((row) => ({
    name: row.name,
    image: row.image.url,
    color: row.color,
    product: row.product.name,
    key: row._id,
  }))
  const handleRemove = (variationId) => {
    dispatch(deleteVariationAction(variationId))
  }
  const dispatch = useDispatch()
  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    }
    dispatch(listVariationAction())
    dispatch(detailProductAction(match.params.slug))
  }, [dispatch, adminInfo, history, match])
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
        <Breadcrumb.Item>
          <Link to="/product/list-products">List Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>List Variation {productDetail?.name}</Breadcrumb.Item>
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
      />
    </>
  )
}

export default ListVariation
