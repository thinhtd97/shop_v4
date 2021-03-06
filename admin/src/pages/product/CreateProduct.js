import React, { useEffect, useState } from 'react'
import { Form, Input, Breadcrumb, Button, Select } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createProductAction } from '../../redux/action/ProductAction'
import {
  listSubCategoryRequest,
  listCateAction,
} from '../../redux/action/CateAction'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
}

const { Option } = Select

const CreateProduct = ({ history }) => {
  const brands = [
    'Gucci',
    'Louis Vuitton',
    'Chanel',
    'Dior',
    'Armani',
    'Tiffany',
  ]
  const dispatch = useDispatch()
  const [name, setName] = useState()
  const [discount, setDiscount] = useState()
  const [newLaunced, setNewLaunced] = useState()
  const [description, setDescription] = useState()
  const [price, setPrice] = useState()
  const [category, setCategory] = useState()
  const [subs, setSubs] = useState()
  const [image, setImage] = useState([])
  const [shipping, setShipping] = useState()
  const [brand, setBrand] = useState()

  // const [values, setValues] = useState({
  //   name: '',
  //   discount: 0,
  //   newLaunced: true,
  //   description: '',
  //   price: 0,
  //   category: '',
  //   subs: [],
  //   image: [],
  //   shipping: false,
  //   brand: '',
  // })
  const { adminInfo } = useSelector((state) => state.adminLogin)
  const { categories } = useSelector((state) => state.cateList)
  const { subCate } = useSelector((state) => state.listSubCate)
  const onFinish = (
    name,
    discount,
    newLaunced,
    description,
    price,
    category,
    subs,
    image,
    shipping,
    brand,
    history,
  ) => {
    dispatch(
      createProductAction(
        name,
        discount,
        newLaunced,
        description,
        price,
        category,
        subs,
        image,
        shipping,
        brand,
        history,
      ),
    )
  }
  const fileUploadChangeAndResize = (e) => {
    let files = e.target.files
    let allUploadedFiles = []
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
                setImage(allUploadedFiles)
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

  const handleCategoryChange = async (value) => {
    setSubs([])
    setCategory(value)
    dispatch(listSubCategoryRequest(value))
  }
  // const handleImageRemove = (public_id) => {
  //   setLoading(true)
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_API}/removeimage`,
  //       { public_id },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${adminInfo.token}`,
  //         },
  //       },
  //     )
  //     .then((res) => {
  //       const { image } = values
  //       let filteredImages = image.filter((item) => {
  //         return item.public_id !== public_id
  //       })
  //       setValues({ ...values, image: filteredImages })
  //       setLoading(false)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       setLoading(false)
  //     })
  // }

  const selectProps = {
    mode: 'multiple',
    name: 'categories',
    value: subs,
    onChange: (value) => {
      setSubs([...value])
    },
    placeholder: 'Sub Categories',
    maxTagCount: 'responsive',
  }
  useEffect(() => {
    if (!adminInfo) {
      history.push('/auth/login')
    }
    dispatch(listCateAction())
  }, [dispatch, adminInfo, history])

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Create Product</Breadcrumb.Item>
      </Breadcrumb>
      <hr />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={() =>
          onFinish(
            name,
            discount,
            newLaunced,
            description,
            price,
            category,
            subs,
            image,
            shipping,
            brand,
            history,
          )
        }
      >
        <Form.Item
          label="Image"
          name="image"
          rules={[{ required: true, message: 'Please input your image!' }]}
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
          name="Product name"
          label="Product Name"
          rules={[{ required: true }]}
        >
          <Input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
          />
        </Form.Item>
        <Form.Item
          name="discount"
          label="Discount"
          rules={[{ required: true }, { min: 0, max: 100 }]}
        >
          <Input
            type="number"
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="discount"
            max={100}
            min={0}
          />
        </Form.Item>
        <Form.Item label="New Product">
          <Select
            defaultValue={true}
            onChange={(value) => setNewLaunced(value)}
          >
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </Form.Item>
        <Form.Item name="Price" label="Price" rules={[{ required: true }]}>
          <Input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Product Price"
          />
        </Form.Item>
        <Form.Item
          label="Category"
          name="Category"
          rules={[
            { required: true, message: 'Please input your parent category!' },
          ]}
        >
          <Select
            name="category"
            onChange={handleCategoryChange}
            placeholder="Category"
          >
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
        <Form.Item
          label="Shipping"
          name="shipping"
          rules={[{ required: true, message: 'Please input your shipping!' }]}
        >
          <Select
            name="shipping"
            onChange={(value) => setShipping(value)}
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
        <Form.Item
          label="Brand"
          name="Brand"
          rules={[
            { required: true, message: 'Please input your parent brand!' },
          ]}
        >
          <Select
            name="Brand"
            onChange={(value) => setBrand(value)}
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
    </>
  )
}

export default CreateProduct
