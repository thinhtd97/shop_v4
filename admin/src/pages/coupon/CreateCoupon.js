import React, { useEffect, useState } from 'react'
import { Form, Input, Breadcrumb, Button } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createCouponAction } from '../../redux/action/CouponAction'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
}

const CreateCoupon = ({ history }) => {
  const dispatch = useDispatch()
  const [code, setCode] = useState()
  const [discount, setDiscount] = useState()
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const onFinish = (code, discount) => {
    dispatch(createCouponAction(code, discount))
  }

  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    }
  }, [adminInfo, history])
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Coupon</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={() => onFinish(code, discount)}
      >
        <Form.Item
          name="code"
          label="Code:"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="text" placeholder="Coupon code..." onChange={(e) => setCode(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="discount"
          label="Discount:"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Discount..." type="text" onChange={(e) => setDiscount(e.target.value)} />
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

export default CreateCoupon
