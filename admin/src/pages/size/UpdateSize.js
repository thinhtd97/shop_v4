import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, Breadcrumb, Select } from 'antd'
import { Link } from 'react-router-dom'
import {
  sizeDetailAction,
  sizeUpdateAction,
} from '../../redux/action/SizeAction'
import { LoadingOutlined } from '@ant-design/icons'

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
}

const UpdateSize = ({ history, match }) => {
  const sizes = ['S', 'M', 'L', 'XL', 'XXL']
  const slug = match.params.slugProduct
  const sizeId = match.params.sizeId
  const variationId = match.params.variationId
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const { size: sizeDetail, loading } = useSelector((state) => state.sizeDetail)
  const [size, setSize] = useState('')
  const [stock, setStock] = useState('')
  const dispatch = useDispatch()
  const onFinish = (sizeId, size, stock) => {
    dispatch(sizeUpdateAction(sizeId, size, stock))
  }
  const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />
  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    } else {
      if (!sizeDetail || !sizeDetail.size || sizeDetail._id !== sizeId) {
        dispatch(sizeDetailAction(sizeId))
      } else {
        setSize(sizeDetail.size)
        setStock(sizeDetail.stock)
      }
    }
  }, [dispatch, adminInfo, history, sizeId, sizeDetail, slug])
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
          <Link to={`/product/list-variation/${slug}`}>List Variation</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/product/variation/list-size/${slug}/${variationId}`}>
            List size
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Update Size</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Button type="primary">
        <Link to={`/product/variation/list-size/${slug}/${variationId}`}>
          Go Back
        </Link>
      </Button>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {loading ? (
          antIcon
        ) : (
          <Form {...layout} onFinish={(e) => onFinish(sizeId, size, stock)}>
            <Form.Item label="Size">
              <Select
                value={size}
                onChange={(value) => setSize(value)}
                placeholder="Select A Size"
              >
                {sizes?.map((size) => (
                  <Option key={size} value={size}>
                    {size}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Stock:">
              <Input
                type="text"
                onChange={(e) => setStock(e.target.value)}
                value={stock}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </>
  )
}

export default UpdateSize
