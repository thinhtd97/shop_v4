import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import ProductRating from '../../components/product/sub-components/ProductRating'
import Avartar from '../../assets/default-user-avatar.jpg'
import {
  userReviewsAction,
  replyComment,
} from '../../redux/actions/userActions'
import Loader from '../../components/Loader'
import { useToasts } from 'react-toast-notifications'

const ProductDescriptionTab = ({
  spaceBottomClass,
  productFullDesc,
  product,
  userInfo,
}) => {
  const dispatch = useDispatch()
  const { addToast } = useToasts()
  const { loading } = useSelector((state) => state.userReview)
  const [openReply, setOpenReply] = useState(false)
  const [comment, setComment] = useState('')
  const [reply, setReply] = useState('')
  const [rating, setRating] = useState('')
  const reviewHandler = (e, slug, comment, rating, addToast) => {
    e.preventDefault()
    dispatch(userReviewsAction(slug, comment, rating, addToast))
  }
  const replyHandler = (slug, user, reply) => {
    dispatch(replyComment(slug, user, reply))
  }
  return (
    <div className={`description-review-area ${spaceBottomClass}`}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  Additional Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Description</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">
                  Reviews({product.reviews?.length})
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  <ul>
                    <li>
                      <span>Weight</span> 400 g
                    </li>
                    <li>
                      <span>Dimensions</span>10 x 10 x 15 cm{' '}
                    </li>
                    <li>
                      <span>Materials</span> 60% cotton, 40% polyester
                    </li>
                    <li>
                      <span>Other Info</span> American heirloom jean shorts pug
                      seitan letterpress
                    </li>
                  </ul>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
                {productFullDesc}
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                {loading ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Loader />
                  </div>
                ) : (
                  <div className="row">
                    {userInfo ? (
                      <Fragment>
                        <div className="col-lg-7">
                          {product?.reviews && product.reviews.length > 0 ? (
                            <Fragment>
                              {product.reviews.map((el, key) => (
                                <div key={key} className="review-wrapper">
                                  <div
                                    className="single-review"
                                    style={{ marginBottom: '20px' }}
                                  >
                                    <div className="review-img">
                                      <img
                                        src={Avartar}
                                        width={50}
                                        style={{ borderRadius: '50%' }}
                                        alt=""
                                      />
                                    </div>
                                    <div className="review-content">
                                      <div className="review-top-wrap">
                                        <div className="review-left">
                                          <div className="review-name">
                                            <h4>{el.name}</h4>
                                          </div>
                                          <div className="review-rating">
                                            <ProductRating value={el.rating} />
                                          </div>
                                        </div>
                                        <div className="review-left">
                                          <button
                                            onClick={() =>
                                              setOpenReply(!openReply)
                                            }
                                          >
                                            Reply
                                          </button>
                                        </div>
                                      </div>
                                      <div className="review-bottom">
                                        <p>{el.comment}</p>
                                      </div>
                                    </div>
                                  </div>

                                  {el.reply.length > 0 ? (
                                    <Fragment>
                                      {el.reply.map((repl, key) => (
                                        <Fragment key={key}>
                                          <div
                                            style={{ marginTop: '20px' }}
                                            className="single-review child-review"
                                          >
                                            <div className="review-img">
                                              <img
                                                src={Avartar}
                                                width={50}
                                                style={{ borderRadius: '50%' }}
                                                alt=""
                                              />
                                            </div>
                                            <div className="review-content">
                                              <div className="review-top-wrap">
                                                <div className="review-left">
                                                  <div className="review-name">
                                                    <h4>{repl.name}</h4>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="review-bottom">
                                                <p>{repl.replyComment}</p>
                                              </div>
                                            </div>
                                          </div>
                                        </Fragment>
                                      ))}
                                    </Fragment>
                                  ) : (
                                    ''
                                  )}
                                  {openReply ? (
                                    <div
                                      className="single-review child-review"
                                      style={{ marginTop: '20px' }}
                                    >
                                      <div className="review-img">
                                        <img
                                          src={Avartar}
                                          width={50}
                                          style={{ borderRadius: '50%' }}
                                          alt=""
                                        />
                                      </div>
                                      <div className="review-content">
                                        <div className="review-top-wrap">
                                          <div className="review-left">
                                            <div className="review-name">
                                              <input
                                                style={{
                                                  background: 'white',
                                                }}
                                                type="text"
                                                onChange={(e) =>
                                                  setReply(e.target.value)
                                                }
                                                placeholder="Reply..."
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="review-bottom">
                                          <button
                                            onClick={() =>
                                              replyHandler(
                                                product.slug,
                                                userInfo._id,
                                                reply,
                                              )
                                            }
                                            className="btn btn-primary"
                                          >
                                            Reply
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    ''
                                  )}
                                </div>
                              ))}
                            </Fragment>
                          ) : (
                            <p> No Reviews </p>
                          )}
                        </div>
                        <div className="col-lg-5">
                          <div className="ratting-form-wrapper pl-50">
                            <h3>Add a Review</h3>
                            <div className="ratting-form">
                              <form
                                onSubmit={(e) =>
                                  reviewHandler(
                                    e,
                                    product.slug,
                                    comment,
                                    rating,
                                    addToast,
                                  )
                                }
                              >
                                <div className="star-box">
                                  <span>Your rating:</span>
                                  <div className="ratting-star">
                                    <select
                                      onChange={(e) =>
                                        setRating(e.target.value)
                                      }
                                    >
                                      <option value={1}>1 - Poor</option>
                                      <option value={2}>2 - Fair</option>
                                      <option value={3}>3 - Good</option>
                                      <option value={4}>4 - Very Good</option>
                                      <option value={5}>5 - Excellent</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="rating-form-style form-submit">
                                      <textarea
                                        onChange={(e) =>
                                          setComment(e.target.value)
                                        }
                                        name="Your Review"
                                        placeholder="Message"
                                        defaultValue={''}
                                      />
                                      <input
                                        type="submit"
                                        defaultValue="Submit"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    ) : (
                      <div
                        className="col-lg-12"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <p>Please Login To Reviews</p>
                      </div>
                    )}
                  </div>
                )}
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  )
}

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
}

export default ProductDescriptionTab
