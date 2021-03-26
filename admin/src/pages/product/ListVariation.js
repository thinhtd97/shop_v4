import React, { useEffect } from 'react'
import { Table, Space, Button, Image } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { deleteVariationAction } from '../../redux/action/variationAction.js'
import { detailProductAction } from '../../redux/action/ProductAction'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import {
  DeleteOutlined,
  FileSyncOutlined,
  PlusSquareFilled,
  LoadingOutlined,
  OrderedListOutlined,
} from '@ant-design/icons'

const ListVariation = ({ history, match }) => {
  const slug = match.params.slug
  const { product: productDetail, loading } = useSelector(
    (state) => state.productDetail,
  )
  const { adminInfo } = useSelector((state) => state.adminLogin)
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
      title: 'Action',
      key: 'action',
      render: (value) => (
        <Space>
          <Button type="primary">
            <Link to={`/variation/update/${slug}/${value.key}`}>
              <FileSyncOutlined />
            </Link>
          </Button>
          <Button type="dashed">
            <Link to={`/variation/create-size/${slug}/${value.key}`}>
              <PlusSquareFilled />
            </Link>
          </Button>
          <Button type="warning">
            {/* /product/list-variation/:slug/:id */}
            <Link to={`/product/variation/list-size/${slug}/${value.key}`}>
              <OrderedListOutlined />
            </Link>
          </Button>
          <Button type="danger" onClick={() => handleRemove(value.key, slug)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ]
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  const data = productDetail?.variation?.map((row) => ({
    name: row.name,
    image: row.image?.url,
    color: row.color,
    size: row.size,
    key: row._id,
  }))
  const handleRemove = (variationId, slug) => {
    dispatch(deleteVariationAction(variationId, slug))
  }
  const dispatch = useDispatch()

  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    }
    dispatch(detailProductAction(slug))
  }, [dispatch, adminInfo, history, slug])
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/product/list-products">List Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>List Variation</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Button type="primary">
        <Link to="/product/list-products">Go Back </Link>
      </Button>
      <Table
        loading={{ indicator: antIcon, spinning: loading }}
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 4
        }}
      />
    </>
  )
}

export default ListVariation
