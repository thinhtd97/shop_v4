import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import {
  detailCategoryAction,
  updateCategoryAction,
} from '../../redux/action/CateAction'
import { LoadingOutlined } from '@ant-design/icons'
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
}

const UpdateCate = ({ history, match }) => {
  const slug = match.params.slug
  const { category, loading } = useSelector((state) => state.cateDetail)
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const [name, setName] = useState('')
  const dispatch = useDispatch()
  const onFinish = (name, slug) => {
    dispatch(updateCategoryAction(name, slug, history))
  }
  const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />
  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    } else {
      if (!category || !category.name || category?.slug !== slug) {
        dispatch(detailCategoryAction(slug))
      } else {
        setName(category.name)
      }
    }
  }, [adminInfo, history, slug, dispatch, category])
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
          <Form {...layout} onFinish={(e) => onFinish(name, slug, history)}>
            <Form.Item label="Category Name:">
              <Input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
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

export default UpdateCate
