import React, { useEffect, useState } from 'react'
import { Form, Input, Breadcrumb, Button } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createCateAction } from '../../redux/action/CateAction'
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
}

const CreateCate = ({ history }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const onFinish = (name) => {
    dispatch(createCateAction(name))
  }

  useEffect(() => {
    if(!adminInfo) {
      history.push('/auth/login')
    }
  }, [adminInfo, history])

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Category</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Form {...layout} name="nest-messages" onFinish={() => onFinish(name)}>
        <Form.Item
          name="name"
          label="Category Name:"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="text" onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default CreateCate
