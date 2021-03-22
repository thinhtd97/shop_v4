import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, Breadcrumb, Select } from 'antd'
import { Link } from 'react-router-dom'
import { detailSubAction, updateSubAction } from '../../redux/action/subAction'
import { listCateAction } from '../../redux/action/CateAction'
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

const UpdateSub = ({ history, match }) => {
  const slug = match.params.slug
  const { sub, loading } = useSelector((state) => state.subDetail)
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const { categories } = useSelector((state) => state.cateList)
  const [name, setName] = useState('')
  const [parent, setParent] = useState('')
  const dispatch = useDispatch()
  const onFinish = (name, parent, slug, history) => {
    dispatch(updateSubAction(name, parent, slug, history))
  }
  const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />
  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    } else {
      if (!sub) {
        dispatch(detailSubAction(slug))
        dispatch(listCateAction())
      } else {
        setName(sub.name)
        setParent(sub.parent._id)
      }
    }
  }, [dispatch, history, slug, adminInfo, sub])
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
          <Form {...layout} onFinish={(e) => onFinish(name, parent, slug, history)}>
            <Form.Item label="Parent Category">
              <Select
                value={parent}
                onChange={(value) => setParent(value)}
                placeholder="Select A Category Name"
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Sub Category Name:">
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

export default UpdateSub
