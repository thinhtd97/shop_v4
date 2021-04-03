import Product from '../models/product.js'
import asyncHandle from 'express-async-handler'
import slugify from 'slugify'

export const create = asyncHandle(async (req, res) => {
  let {
    name,
    discount,
    newLaunced,
    saleCount,
    description,
    price,
    category,
    subs,
    sold,
    image,
    shipping,
    brand,
    numReviews,
    countInStock,
  } = req.body
  const existProduct = await Product.findOne({ name })
  try {
    price = Number(price)
    discount = Number(discount)
    const newProduct = new Product({
      name,
      slug: slugify(name),
      discount,
      newLaunced,
      saleCount,
      description,
      price,
      category,
      subs,
      sold,
      image,
      shipping,
      brand,
      numReviews,
      countInStock,
    })
    const createProduct = await newProduct.save()

    res.json(createProduct)
  } catch (error) {
    console.log(error)

    if (existProduct) {
      res.status(400)
      throw new Error('Product already exists.')
    }
    res.status(400)
    throw new Error('Create Product Failed.')
  }
})
export const list = asyncHandle(async (req, res) => {
  const products = await Product.find()
    .populate('category', '_id name')
    .populate('subs')
    .populate({
      path: 'variation',
      model: 'Variation',
      populate: {
        path: 'size',
        model: 'Size',
      },
    })
    .sort([['createdAt', 'desc']])
    .limit(parseInt(req.params.count))
  if (products) {
    return res.status(200).json(products)
  } else {
    res.status(400)
    throw new Error('Product not found.')
  }
})
export const read = asyncHandle(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate('category', '_id name')
    .populate('variation')
    .populate('review')
    .populate('subs', '_id name')
    .populate({
      path: 'variation',
      model: 'Variation',
      populate: {
        path: 'size',
        model: 'Size',
      },
    })
  res.json(product)
})
export const update = asyncHandle(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = `${slugify(req.body.name)}-${Date.now()}`
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true,
      },
    ).exec()
    res.json(updated)
  } catch (error) {
    console.log(`Update Error: ${error}`)
    return res.status(400).send('Product update fail.')
  }
})
export const remove = asyncHandle(async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ slug: req.params.slug })
    res.json(deleted)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Product Delete failed.')
  }
})
export const getProductCurrent = asyncHandle(async (req, res) => {
  try {
    const product = await Product.findOne({
      variation: { $in: [req.params.variId] },
    })
    res.json(product)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Product not found.')
  }
})
export const getNewProducts = asyncHandle(async (req, res) => {
  try {
    const newProduct = await Product.find({ newLaunced: true })
    if (!newProduct) {
      res.status(400)
      throw new Error('Product not found.')
    }
    res.json(newProduct)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Product not found.')
  }
})
