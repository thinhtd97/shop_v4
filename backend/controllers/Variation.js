import Variation from '../models/Variation.js';
import Product from '../models/product.js';
import Size from '../models/Size.js';
import asyncHandle from 'express-async-handler'

export const create = asyncHandle(async (req, res) => {
  const { color, image, product } = req.body
  try {
    const productExist = await Product.findOne({ _id: product })
    const variation = new Variation({
      color,
      image,
      product,
    })
    const variationCreated = await variation.save()
    if (variationCreated) {
      productExist.variation.push(variationCreated._id)
      await productExist.save()
    }
    res.json(variation)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Create Variation Failed.')
  }
})
export const list = asyncHandle(async (req, res) => {
  res.json(await Variation.find({}).sort({ createdAt: -1 }).populate('product'))
})
export const read = asyncHandle(async (req, res) => {
  const variation = await Variation.findOne({
    _id: req.params.variId,
  }).populate('product', '_id name').populate('size').limit(5)
  res.json(variation)
})
export const update = asyncHandle(async (req, res) => {
  const { color, image, product, currentProductId } = req.body
  try {
    const productUpdate = await Product.findOne({ _id: product })
    const flag = productUpdate.variation.includes(req.params.variId)
    await Product.updateOne(
      { _id: currentProductId },
      { $pull: { 'variation': `${req.params.variId}` } },
    )
    if (!flag) {
      productUpdate.variation.push(req.params.variId)
      await productUpdate.save()
    }

    const updated = await Variation.findOneAndUpdate(
      { _id: req.params.variId },
      { color, image, product },
      { new: true },
    )
    if (!updated) {
      res.status(400)
      throw new Error('Variation Update Failed.')
    }
    res.json(currentProductId)
  } catch (error) {
    console.log(error)
    res.status(404)
    throw new Error(`${error}`)
  }
})

export const remove = asyncHandle(async (req, res) => {
  try {
    const deleted = await Variation.findOneAndDelete({ _id: req.params.id })
    await Product.updateOne(
      {},
      { $pull: { 'variation': { $in: `${req.params.id}` } } },
    )
    await Size.deleteMany({ variation: req.params.id })
    res.json(deleted)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Variation Delete failed.')
  }
})