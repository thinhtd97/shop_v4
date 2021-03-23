import React, { useEffect, useState } from 'react'
import { Form, Input, Breadcrumb, Button, Select, notification } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import { createVariationAction } from '../../redux/action/variationAction'
import { listProductAction } from '../../redux/action/ProductAction'
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
}

const { Option } = Select

const CreateVariation = ({ history }) => {
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue']
  const dispatch = useDispatch()
  const [color, setColor] = useState('')
  const [product, setProduct] = useState('')
  const [image, setImage] = useState({})
  const { products } = useSelector((state) => state.productList)
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const onFinish = (color, product, image) => {
    dispatch(createVariationAction(color, product, image))
  }

  const fileUploadChangeAndResize = (e) => {
    let files = e.target.files
    let allUploadedFiles = image
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

  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    } else {
      dispatch(listProductAction())
    }
  }, [adminInfo, history, dispatch])

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Variation</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={() => onFinish(color, product, image)}
      >
        <Form.Item
          label="Image"
        >
          <Input
            name="image"
            type="file"
            accept="images/*"
            onChange={fileUploadChangeAndResize}
            multiple
          />
        </Form.Item>
        <Form.Item
          label="Color"
          name="Color"
          rules={[{ required: true, message: 'Please input your color!' }]}
        >
          <Select
            onChange={(value) => setColor(value)}
            placeholder="Select A Color"
          >
            {colors?.map((color) => (
              <Option key={color} value={color}>
                {color}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Parent Product"
          name="Product"
          rules={[{ required: true, message: 'Please input your product!' }]}
        >
          <Select
            onChange={(value) => setProduct(value)}
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select Product"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default CreateVariation
