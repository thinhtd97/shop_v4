import React, { useEffect, useState } from 'react'
import { Form, Input, Breadcrumb, Button, Select } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createSubAction } from '../../redux/action/subAction'
import { listCateAction } from '../../redux/action/CateAction.js'
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
}

const { Option } = Select;

const CreateSub = ({ history }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState();
  const [parent, setParent] = useState('');
  const { categories } = useSelector(state => state.cateList);
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const onFinish = (name, parent) => {
    dispatch(createSubAction(name, parent))
  }

  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    } else {
      dispatch(listCateAction())
    }
  }, [adminInfo, history, dispatch])

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Sub Category</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Form {...layout} name="nest-messages" onFinish={() => onFinish(name, parent)}>
        <Form.Item
          label="Parent Category"
          name="category"
          rules={[{ required: true, message: 'Please input your category!' }]}
        >
          <Select
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
        <Form.Item
          name="Sub Category"
          label="Sub Category Name:"
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

export default CreateSub
