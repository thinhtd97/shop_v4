import Category from '../models/category.js'
import Sub from '../models/sub.js'
import asyncHandle from 'express-async-handler'
import slugify from 'slugify'
import Product from '../models/product.js'

export const create = asyncHandle(async (req, res) => {
  const { name } = req.body
  const existCategory = await Category.findOne({ name })
  try {
    const category = await new Category({
      name,
      slug: `${slugify(name).toLowerCase()}-${Date.now()}`,
    }).save()

    res.json(category)
  } catch (error) {
    console.log(error)
    if (existCategory) {
      res.status(400)
      throw new Error('Category Already Exists.')
    }
    res.status(400)
    throw new Error('Create Category Failed.')
  }
})
export const list = asyncHandle(async (req, res) => {
  res.json(await Category.find({}).sort({ createdAt: -1 }))
})
export const read = asyncHandle(async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug })
  res.json(category)
})
export const update = asyncHandle(async (req, res) => {
  const { name } = req.body
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: `${slugify(name)}-${Date.now()}` },
      { new: true },
    )
    if (!updated) {
      res.status(400)
      throw new Error('Category Update Failed.')
    }
    res.json(updated)
  } catch (error) {
    res.status(404)
    throw new Error(`${error}`)
  }
})
export const remove = asyncHandle(async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug })
    await Product.updateMany({}, { $pullAll: { category: `${category._id}` } })
    await Sub.updateMany({}, { $pullAll: { parent: `${category._id}` } })
    if (category) {
      await category.remove()
    }
    res.json({
      message: 'Delete Success.',
    })
  } catch (error) {
    res.status(400)
    throw new Error('Category Delete failed.')
  }
})
export const getSubs = asyncHandle(async (req, res) => {
  try {
    const subs = Sub.find({ parent: req.params.id })
      .populate('parent', '_id name')
      .exec((err, subs) => {
        if (err) console.log(err)
        res.json(subs)
      })
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})
