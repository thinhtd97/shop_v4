import Sub from '../models/sub.js'
import asyncHandle from 'express-async-handler'
import slugify from 'slugify'

export const create = asyncHandle(async (req, res) => {
  const { name, parent } = req.body
  const subExist = await Sub.findOne({ name })
  try {
    const sub = await new Sub({
      name,
      parent,
      slug: slugify(name).toLowerCase(),
    }).save()
    res.json(sub)
  } catch (error) {
    console.log(error)
    if (subExist) {
      res.status(400)
      throw new Error('Sub already exists.')
    }
    res.status(400)
    throw new Error('Create Sub Failed.')
  }
})
export const list = asyncHandle(async (req, res) => {
  res.json(
    await Sub.find({})
      .sort({ createdAt: -1 })
      .populate('parent', '_id name slug'),
  )
})
export const read = asyncHandle(async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).populate(
    'parent',
    '_id name slug',
  )
  res.json(sub)
})
export const update = asyncHandle(async (req, res) => {
  const { name, parent } = req.body
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name), parent },
      { new: true },
    )
    if (!updated) {
      res.status(400)
      throw new Error('Sub Update Failed.')
    }
    res.json(updated)
  } catch (error) {
    res.status(404)
    throw new Error(`${error}`)
  }
})
export const remove = asyncHandle(async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug })
    res.json(deleted)
  } catch (error) {
    res.status(400)
    throw new Error('Sub Delete failed.')
  }
})
