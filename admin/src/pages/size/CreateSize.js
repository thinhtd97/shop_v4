import React, { useEffect, useState } from 'react'
import { Form, Breadcrumb, Button, Select, Input } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { detailProductAction } from '../../redux/action/ProductAction'
import { sizeCreateAction } from '../../redux/action/SizeAction'
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
}
const { Option } = Select
const CreateSize = ({ history, match }) => {
  const slugProduct = match.params.slugProduct
  const variationId = match.params.variationId
  const dispatch = useDispatch()
  const { product: productDetail } = useSelector((state) => state.productDetail)
  const sizes = ['S', 'M', 'L', 'XL', 'XXL']
  const [size, setSize] = useState()
  const [stock, setStock] = useState()
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const onFinish = (variationId, size, stock, slug) => {
    dispatch(sizeCreateAction(variationId, size, stock, slug))
  }

  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    } else {
      dispatch(detailProductAction(slugProduct))
    }
  }, [adminInfo, history, dispatch, slugProduct])

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/product/list-variation/${slugProduct}`}>
            {productDetail && `List Variation ${productDetail.name}`}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Size</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Button type="primary">
        <Link to={`/product/list-variation/${slugProduct}`}>Go back</Link>
      </Button>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={() => onFinish(variationId, size, stock, slugProduct)}
      >
        <Form.Item
          label="Size"
          name="Size"
          rules={[{ required: true, message: 'Please select your size!' }]}
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
          name="stock"
          label="Stock:"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" onChange={(e) => setStock(e.target.value)} />
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

export default CreateSize
