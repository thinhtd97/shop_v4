import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, Breadcrumb, Select } from 'antd'
import { Link } from 'react-router-dom'
import {
  detailProductAction,
  updateProductAction,
} from '../../redux/action/ProductAction'
import {
  listCateAction,
  listSubCategoryRequest,
} from '../../redux/action/CateAction'
import { LoadingOutlined } from '@ant-design/icons'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'

const { Option } = Select
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
}

const UpdateProduct = ({ history, match }) => {
  const slug = match.params.slug
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue']
  const brands = [
    'Gucci',
    'Louis Vuitton',
    'Chanel',
    'Dior',
    'Armani',
    'Tiffany',
  ]

  const { product, loading } = useSelector((state) => state.productDetail)
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const { subCate } = useSelector((state) => state.listSubCate)
  const { categories } = useSelector((state) => state.cateList)
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    name: '',
    discount: '',
    newLaunced: true,
    description: '',
    price: '',
    category: [],
    subs: [],
    image: [],
    shipping: false,
    brand: '',
    numReviews: 0,
    countInStock: 0,
  })
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const {
    name,
    discount,
    newLaunced,
    description,
    price,
    category,
    subs,
    shipping,
    brand,
  } = values
  const handleChangeNewProduct = (value) => {
    setValues({ ...values, newLaunced: value })
  }
  const handleCategoryChange = async (value) => {
    setValues({ ...values, subs: [], category: { _id: value, ...category } })
    dispatch(listSubCategoryRequest(value))
  }
  const selectProps = {
    mode: 'multiple',
    name: 'categories',
    value: subs,
    onChange: (value) => {
      setValues({ ...values, subs: [...value] })
    },
    maxTagCount: 'responsive',
  }

  const onFinish = (values, slug, history) => {
    dispatch(updateProductAction(values, slug, history))
  }
  const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />
  const fileUploadChangeAndResize = (e) => {
    let files = e.target.files
    let allUploadedFiles = values.image
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
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
                allUploadedFiles.push(res.data)
                setValues({ ...values, image: allUploadedFiles })
              })
              .catch((err) => {
                console.log('Upload Error: ' + err)
              })
          },
          'base64',
        )
      }
    }
  }
  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    } else {
      if (!product || !product.name || product.slug !== slug) {
        dispatch(listCateAction())
        dispatch(detailProductAction(slug))
      } else {
        setValues({
          name: product.name,
          discount: product.discount,
          newLaunced: product.newLaunced,
          description: product.description,
          price: product.price,
          category: product.category,
          subs: product.subs,
          image: product.image,
          shipping: product.shipping,
          brand: product.brand,
        })
        if (subs) {
          dispatch(listSubCategoryRequest(product.category._id))
        }
      }
    }
  }, [adminInfo, history, slug, dispatch, product])
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Update Product</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
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
            onFinish={() => onFinish(values)}
          >
            <Form.Item label="Image">
              <Input
                name="image"
                type="file"
                accept="images/*"
                onChange={fileUploadChangeAndResize}
                multiple
              />
            </Form.Item>
            <Form.Item label="Product Name">
              <Input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Product Name"
              />
            </Form.Item>
            <Form.Item label="Discount">
              <Input
                type="number"
                name="discount"
                onChange={handleChange}
                placeholder="discount"
                value={discount}
                max={100}
                min={0}
              />
            </Form.Item>
            <Form.Item label="New Product">
              <Select value={newLaunced} onChange={handleChangeNewProduct}>
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Description">
              <Input.TextArea
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
                value={description}
                placeholder="Description"
              />
            </Form.Item>
            <Form.Item label="Price">
              <Input
                value={price}
                type="number"
                name="price"
                onChange={handleChange}
                placeholder="Product Price"
              />
            </Form.Item>
            <Form.Item label="Category">
              <Select value={category._id} onChange={handleCategoryChange}>
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Sub Categories">
              <Select {...selectProps}>
                {subCate?.map((sub) => (
                  <Option key={sub._id} value={sub._id}>
                    {sub.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Shipping">
              <Select
                value={shipping}
                name="shipping"
                onChange={(value) => setValues({ ...values, shipping: value })}
                placeholder="Shipping"
              >
                <Option key={1} value={true}>
                  Yes
                </Option>
                <Option key={0} value={false}>
                  No
                </Option>
              </Select>
            </Form.Item>
            <Form.Item label="Brand">
              <Select
                name="Brand"
                value={brand}
                onChange={(value) => setValues({ ...values, brand: value })}
                placeholder="Brand"
              >
                {brands.map((b) => (
                  <Option key={b} value={b}>
                    {b}
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
        )}
      </div>
    </>
  )
}

export default UpdateProduct
