import React, { useEffect, useState } from 'react'
import { Form, Input, Breadcrumb, Button, Select, notification } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import { createVariationAction } from '../../redux/action/variationAction'
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
}

const { Option } = Select

const CreateVariation = ({ history, match }) => {
  const productId = match.params.id;
  const colors = [
    {
      title: "Black",
      value: "black"
    },
    {
      title: "Brown",
      value: "brown"
    },
    {
      title: "Green",
      value: "green"
    },
    {
      title: "White",
      value: "white"
    },
    {
      title: "Blue",
      value: "blue"
    }
  ]
  const dispatch = useDispatch()
  const [color, setColor] = useState('')
  const [product, setProduct] = useState('')
  const [image, setImage] = useState({})
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const onFinish = (color, product, image, history) => {
    dispatch(createVariationAction(color, product, image, history))
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
      setProduct(productId)
    }
  }, [adminInfo, history, dispatch, productId])

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/product/list-products">List Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Variation</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Button type="primary">
        <Link to="/product/list-products">Go Back</Link>
      </Button>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={() => onFinish(color, product, image, history)}
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
              <Option key={color.value} value={color.value}>
                {color.title}
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
