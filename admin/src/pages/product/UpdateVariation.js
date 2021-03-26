import { Breadcrumb, Form, Select, notification, Input, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import {
  detailVariationAction,
  updateVariationAction,
} from '../../redux/action/variationAction'
import {
  detailProductAction,
  listProductAction,
} from '../../redux/action/ProductAction'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
const { Option } = Select

const UpdateVariation = ({ history, match }) => {
  const variationId = match.params.id
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue']
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const { products } = useSelector((state) => state.productList)
  const { product: productCurrent } = useSelector(
    (state) => state.productCurrent,
  )
  const slugProduct = match.params.slug;
  const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />
  const dispatch = useDispatch()
  const { variation, loading } = useSelector((state) => state.variationDetail)
  const { product: productDetail } = useSelector((state) => state.productDetail)
  const [color, setColor] = useState('')
  const [product, setProduct] = useState('')
  const [image, setImage] = useState([])
  // const [currentProductId, setCurrentProductId] = useState('')
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  }
  const fileUploadChangeAndResize = (e) => {
    let files = e.target.files
    let allUploadedFiles = []
    if (files) {
      Resizer.imageFileResizer(
        files[files.length - 1],
        600,
        800,
        'JPEG',
        100,
        0,
        (uri) => {
          axios
            .post(
              `${process.env.REACT_APP_API}/uploadimages`,
              { image: uri },
              {
                headers: {
                  Authorization: `Bearer ${adminInfo.token}`,
                },
              },
            )
            .then((res) => {
              allUploadedFiles = res.data
              setImage(allUploadedFiles)
              notification['success']({
                message: 'Upload',
                description: `Upload Success`,
              })
            })
            .catch((err) => {
              console.log('Upload Error: ' + err)
            })
        },
        'base64',
      )
    }
  }
  const onFinish = (color, product, image, variationId) => {
    dispatch(
      updateVariationAction(
        color,
        product,
        image,
        variationId,
        productDetail._id,
      ),
    )
  }
  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    } else {
      if (!variation || !variation.color || variation._id !== variationId) {
        dispatch(detailVariationAction(variationId))
        dispatch(listProductAction())
        dispatch(detailProductAction(slugProduct))
      } else {
        setColor(variation.color)
        setImage(variation.image)
        setProduct(variation.product._id)
      }
    }
  }, [dispatch, history, adminInfo, variation, variationId, slugProduct])
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/product/list-products">List Product </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/product/list-variation/${slugProduct}`}>
            List Variation
          </Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>Update Variation</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Button type="primary">
        <Link to={`/product/list-variation/${slugProduct}`}>Go Back</Link>
      </Button>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {loading ? (
          antIcon
        ) : (
          <Form
            {...layout}
            name="nest-messages"
            onFinish={() =>
              onFinish(color, product, image, variationId)
            }
          >
            <Form.Item label="Color">
              <Select
                onChange={(value) => setColor(value)}
                placeholder="Select A Color"
                value={color}
              >
                {colors?.map((color) => (
                  <Option key={color} value={color}>
                    {color}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Parent Product">
              <Select
                onChange={(value) => setProduct(value)}
                value={product}
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select Product"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {products?.map((product) => (
                  <Option key={product._id} value={product._id}>
                    {product.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Image" value={image}>
              <Input
                name="image"
                type="file"
                accept="images/*"
                onChange={fileUploadChangeAndResize}
                multiple
              />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </>
  )
}

export default UpdateVariation
