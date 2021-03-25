import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import {
  detailVariationAction
} from '../../redux/action/variationAction'
import { LoadingOutlined } from '@ant-design/icons'
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
}

const UpdateSize = ({ history, match }) => {
  const variationId = match.params.variationId
//   const { category, loading } = useSelector((state) => state.cateDetail)
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const { variation, loading } = useSelector((state) => state.variationDetail)
  const [size, setSize] = useState('')
  const [stock, setStock] = useState('')
  const dispatch = useDispatch()
  const onFinish = () => {
    
  }
  const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />
  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    } else {
      if (!variation || !variation.size || variation._id !== variationId) {
      } else {
      }
    }
  }, [adminInfo, history, variationId, dispatch, variation])
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Update Category</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
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
          <Form {...layout} onFinish={(e) => onFinish()}>
            <Form.Item label="Size:">
              <Input
                type="text"
                onChange={(e) => setSize(e.target.value)}
                value={size}
              />
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
