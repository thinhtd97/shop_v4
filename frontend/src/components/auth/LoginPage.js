import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { loginActionRequest } from '../../redux/actions/userActions'

const LoginPage = () => {
  const { addToast } = useToasts();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginActionRequest(email, password, addToast));
  }
  return (
    <div className="login-form-container">
      <div className="login-register-form">
        <form onSubmit={loginSubmit}>
          <input
            type="text"
            name="user-name"
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="user-password"
            placeholder="Password"
          />

          <div className="button-box">
            <div className="login-toggle-btn">
              <input type="checkbox" />
              <label className="ml-10">Remember me</label>
              <Link to={process.env.PUBLIC_URL + '/reset-password'}>Forgot Password?</Link>
            </div>
            <button type="submit">
              <span>Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
