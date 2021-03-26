import React, { useEffect } from 'react'
import { Table, Space, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { detailVariationAction } from '../../redux/action/variationAction.js'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import {
  DeleteOutlined,
  FileSyncOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { sizeDeleteAction } from '../../redux/action/SizeAction.js'
import { detailProductAction } from '../../redux/action/ProductAction.js'

const ListSize = ({ history, match }) => {
  const variationId = match.params.variationId
  const slugProduct = match.params.slugProduct
  const { variation, loading } = useSelector((state) => state.variationDetail)
  const { product: productDetail } = useSelector((state) => state.productDetail)
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
            <Link to={`/product/variation/list-size/update/${slugProduct}/${variation?._id}/${value.key}`}>
              <FileSyncOutlined />
            </Link>
          </Button>
          <Button
            type="danger"
            onClick={() => handleRemove(variationId, value.key, slugProduct)}
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
    stock: row.stock,
    key: row._id,
  }))
  const handleRemove = (variationId, sizeId, slug) => {
    dispatch(sizeDeleteAction(variationId, sizeId, slug))
  }
  const dispatch = useDispatch()
  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    }
    dispatch(detailVariationAction(variationId))
    dispatch(detailProductAction(slugProduct))
  }, [dispatch, adminInfo, history, variationId, slugProduct])
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/product/list-products`}>List Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/product/list-variation/${slugProduct}`}>List Variation</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>List Size </Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Button type="primary">
        <Link to={`/product/list-variation/${slugProduct}`}>Go Back</Link>
      </Button>
      <Table
        loading={{ indicator: antIcon, spinning: loading }}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 4, total: (variation?.size?.length - 1) }}
      />
    </>
  )
}

export default ListSize
