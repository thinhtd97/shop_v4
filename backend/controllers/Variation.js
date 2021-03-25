import Variation from '../models/Variation.js'
import Product from '../models/product.js'
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
  }).populate('product', '_id name')
  res.json(variation)
})
export const update = asyncHandle(async (req, res) => {
  const { color, image, product, currentProductId } = req.body
  try {
    const productUpdate = await Product.findOne({ _id: product })
    const flag = productUpdate.variation.includes(req.params.variId)
    await Product.updateOne(
      { _id: currentProductId },
      { $pull: { variation: `${req.params.variId}` } },
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
      { $pull: { variation: { $in: `${req.params.id}` } } },
    )
    res.json(deleted)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Variation Delete failed.')
  }
})

export const createSize = asyncHandle(async (req, res) => {
  const { stock, size } = req.body
  try {
    const variation = await Variation.findOne({ _id: req.params.id })
    if (variation) {
      const sizeOne = {
        size,
        stock,
      }
      variation.size.push(sizeOne)
      await variation.save()
      return res.json({ message: 'Create Success' })
    }
    res.json({
      message: 'Variation not found',
    })
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Create Size failed.')
  }
})
export const removeSize = asyncHandle(async (req, res) => {
  try {
    await Variation.updateOne(
      { _id: req.params.id },
      { $pull: { size: { _id: req.params.sizeId } } },
    )
    res.json({
      message: 'Deleted Success',
    })
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Delete Size failed.')
  }
})
export const updateSize = asyncHandle(async (req, res) => {
  try {
    const { stock, size } = req.body
    await Variation.updateOne(
      { _id: req.params.id, 'size._id': req.params.sizeId },
      {
        $set: {
          'size.$.stock': stock,
          'size.$.size': size,
        },
      },
    )
    res.json({
      message: 'Updated Success',
    })
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Update Size failed.')
  }
})
export const detailSize = asyncHandle(async (req, res) => {
  try {
    const variation = await Variation.findOne({ "size._id": req.params.sizeId });
    res.json(variation.size)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Size not found.')
  }
})
