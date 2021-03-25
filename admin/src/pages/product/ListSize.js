import React, { useEffect } from 'react'
import { Table, Space, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import {
  DeleteOutlined,
  FileSyncOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import {
  deleteSizeAction,
  detailVariationAction,
} from '../../redux/action/variationAction.js'
import {  detailProductAction } from '../../redux/action/ProductAction.js'

const ListSize = ({ history, match }) => {
  const variationId = match.params.id;
  const slugProduct = match.params.slug;
  const { product } = useSelector(
    (state) => state.productDetail,
  )
  const { variation, loading } = useSelector((state) => state.variationDetail)
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const columns = [
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Action',
      key: 'action',
      render: (value) => (
        <Space>
          <Button type="primary">
            <Link to={`/product/list-variation/update-size/${variationId}/${value.key}`}>
              <FileSyncOutlined />
            </Link>
          </Button>
          <Button
            type="danger"
            onClick={() => handleRemove(variationId, value.key)}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ]
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  const data = variation?.size?.map((row) => ({
    size: row.size,
    size_id: row.size._id,
    stock: row.stock,
    key: row._id,
  }))
  const handleRemove = (variation_id, size_id) => {
    dispatch(deleteSizeAction(variation_id, size_id))
  }
  const dispatch = useDispatch()
  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    }
    dispatch(detailVariationAction(variationId))
    dispatch(detailProductAction(slugProduct))
  }, [dispatch, adminInfo, history, slugProduct, variationId])
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/product/list-products">List Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/product/list-variation/${slugProduct}`}>{product && `List Variation ${product.name}`} </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{product && `List Size ${product?.name}`}</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Button type="primary">
         <Link to={`/product/list-variation/${slugProduct}`}>Go Back</Link>
      </Button>
     
      <Table
        loading={{ indicator: antIcon, spinning: loading }}
        columns={columns}
        dataSource={data}
      />
    </>
  )
}

export default ListSize
