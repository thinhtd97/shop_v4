import { Breadcrumb, Button, Form, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { createSizeAction } from '../../redux/action/variationAction';
const { Option } = Select

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
}

const CreateSize = ({  match }) => {
  const variationId = match.params.id;
  const history = useHistory()
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const dispatch = useDispatch()
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const onFinish = (size, stock, variation_id) => {
    dispatch(createSizeAction(size, stock, variation_id))
  }
  const [size, setSize] = useState('')
  const [stock, setStock] = useState(0)
  useEffect(() => {
    if(!adminInfo) {
      history.push('/auth/login');
    }
  }, [history, adminInfo])
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Size</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Form {...layout} name="nest-messages" onFinish={() => onFinish(size, stock, variationId)}>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Form.Item
            label="Size"
            name="size"
            rules={[{ required: true, message: 'Please input your size!' }]}
          >
            <Select
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
          <Form.Item
            label="Stock"
            name="stock"
            rules={[{ required: true, message: 'Please input your stock!' }]}
          >
            <Input
              placeholder="Stock Product"
              onChange={(e) => setStock(e.target.value)}
              type="number"
            />
          </Form.Item>
          <Button
            wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default CreateSize
