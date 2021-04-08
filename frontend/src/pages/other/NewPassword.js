import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from 'react-toast-notifications';
import { newPasswordAction } from "../../redux/actions/userActions";
import { useParams } from "react-router-dom";

const NewPassword = ({ location, history }) => {
  const { addToast } = useToasts();
  const { token } = useParams();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const { pathname } = location;
  const submitHandler = (e, password, confirmPassword) => {
    e.preventDefault();
    if(password !== confirmPassword) {
        return addToast('Password and confirm password not match', {
            autoDismiss: true,
            appearance: 'error',
            autoDismissTimeout: 1000,
        })
    } else {
        dispatch(newPasswordAction(password, token, history, addToast))
    }
  }
  const redirect = location.search ? location.search.split('=')[1] : '/';
  useEffect(() => {
    if(userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect])
  return (
    <Fragment>
      <MetaTags>
        <title>Shop | New Password</title>
        <meta
          name="description"
          content="Compare page of shop react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Change new Password
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="register">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>New Password</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={(e) => submitHandler(e, password, confirmPassword)}>
                            <input
                                type="password"
                                name="user-password"
                                placeholder="password"
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <input
                                type="password"
                                name="user-confirmpassword"
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Submit</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};


export default NewPassword;
