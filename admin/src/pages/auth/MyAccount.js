import React, { useEffect, useState } from 'react'
import { Breadcrumb, Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getProfileAction,
  updateAdminAction,
} from '../../redux/action/userAdminAction'
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}
const MyAccount = ({ history }) => {
  const { admin } = useSelector((state) => state.adminProfile)
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  })
  const [form] = Form.useForm()

  const onFinish = (values) => {
    dispatch(updateAdminAction(values))
  }

  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    } else {
      if (!admin) {
        dispatch(getProfileAction())
      } else {
        setValues({
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          address: admin.address,
          phone: admin.phone,
        })
      }
    }
  }, [admin, adminInfo, dispatch, history])

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Change Password</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={() => onFinish(values)}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item label="First Name">
          <Input
            value={values.firstName}
            onChange={(e) =>
              setValues({ ...values, firstName: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Last Name">
          <Input
            value={values.lastName}
            onChange={(e) => setValues({ ...values, lastName: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="E-mail">
          <Input value={values.email} />
        </Form.Item>
        <Form.Item label="Phone Number">
          <Input
            style={{
              width: '100%',
            }}
            value={values.phone}
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Address">
          <Input
            value={values.address}
            onChange={(e) => setValues({ ...values, address: e.target.value })}
          />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default MyAccount
