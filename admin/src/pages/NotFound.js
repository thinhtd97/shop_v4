import React, { useEffect } from 'react'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const NotFound = ({ history }) => {
  const { adminInfo } = useSelector((state) => state.adminLogin)
  useEffect(() => {
     if(!adminInfo) {
       history.push('/auth/login');
     }
  }, [adminInfo, history])
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary"><Link to="/">Back Home</Link></Button>}
    />
  )
}

export default NotFound
