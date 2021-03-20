import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginAdminAction } from '../../redux/action/userAdminAction'

const LoginPage = ({ history, location }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.adminLogin);
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const loginHandler = (e, email, password) => {
    e.preventDefault()
    dispatch(loginAdminAction(email, password))
  }
  useEffect(() => {
    if(adminInfo) {
      history.push(redirect);
    }
  }, [adminInfo, history, redirect])
  return (
    <form onSubmit={(e) => loginHandler(e, email, password)}>
      <h3>Admin Account</h3>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Submit
      </button>
      <p className="forgot-password text-right">
        Forgot <Link to="/forgot-password">password?</Link>
      </p>
    </form>
  )
}

export default LoginPage
