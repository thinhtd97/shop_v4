import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Button, Space, notification } from 'antd'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changePasswordAction } from '../../redux/action/userAdminAction'
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}



const ChangePassword = ({ history }) => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const formRef = useRef()
  const onFinish = () => {
    if(password !== confirmPassword) {
      return notification['error']({
        message: 'Change Password',
        description: "Confirm password and new password should match",
      })
    }
    dispatch(changePasswordAction(password, oldPassword))
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }
  const onReset = () => {
    formRef.current.resetFields()
  }
  const { adminInfo } = useSelector((state) => state.adminLogin)
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
        <Breadcrumb.Item>My Account</Breadcrumb.Item>
      </Breadcrumb>
      <Form {...layout} ref={formRef} name="control-ref" onFinish={onFinish}>
        <Form.Item
          name="Your password"
          label="Your password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            autoComplete="current-password"
          />
        </Form.Item>
        <Form.Item
          name="New Password"
          label="New Password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="Confirm Password"
          label="Confirm Password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            type="password"
            autoComplete="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.gender !== currentValues.gender
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('gender') === 'other' ? (
              <Form.Item
                name="customizeGender"
                label="Customize Gender"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}

export default ChangePassword
