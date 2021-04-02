import Size from '../models/Size.js'
import Variation from '../models/Variation.js'
import Product from '../models/product.js'
import asyncHandle from 'express-async-handler'

export const createSize = asyncHandle(async (req, res) => {
  let { stock, size } = req.body
  try {
    const variation = await Variation.findOne({ _id: req.params.variationId })
    const updateProduct = await Product.findOne({
      slug: req.params.slugProduct,
    })
    const sizeExist = await Size.findOne({ size, variation: req.params.variationId  })
    if (updateProduct) {
      updateProduct.countInStock += Number(stock)
      await updateProduct.save()
    }
    if (variation) {
      if (sizeExist) {
        sizeExist.stock += Number(stock)
        const changeSized = await sizeExist.save()
        res.json(changeSized);
      } else {
        const newSize = new Size({
          stock: Number(stock),
          size,
          variation: req.params.variationId,
        })
        const created = await newSize.save()
        if (created) {
          variation.size.push(created._id)
          await variation.save()
        }
        res.json(created)
      }
    } else {
      res.status(400)
      throw new Error('Create Size Failed.')
    }
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Create Size Failed.')
  }
})
export const removeSize = asyncHandle(async (req, res) => {
  const size = await Size.findById(req.params.sizeId)
  const productUpdate = await Product.findOne({ slug: req.params.slugProduct })
  try {
    if (productUpdate) {
      productUpdate.countInStock -= Number(size.stock)
      await productUpdate.save()
    }
    await Variation.updateOne(
      { _id: req.params.variationId },
      { $pull: { size: `${req.params.sizeId}` } },
    )
    const deleted = await size.remove()
    if (deleted) {
      res.json({
        message: 'Delete Success.',
      })
    }
  } catch (error) {
    if (!size) {
      res.status(400)
      throw new Error('Size Not Found.')
    }
    console.log(error)
    res.status(400)
    throw new Error('Delete Size Failed.')
  }
})
export const detailSize = asyncHandle(async (req, res) => {
  try {
    const size = await Size.findById(req.params.id)
    res.json(size)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Size not found.')
  }
})
export const updateSize = asyncHandle(async (req, res) => {
  const { size, stock } = req.body
  try {
    const sizeOld = await Size.findOne({ _id: req.params.id })
    const productUpdate = await Product.findOne({
      slug: req.params.slugProduct,
    })
    if (productUpdate) {
      productUpdate.countInStock -= Number(sizeOld.stock)
      productUpdate.countInStock += Number(stock)
      await productUpdate.save()
    }
    const updated = await Size.findByIdAndUpdate(
      req.params.id,
      {
        size,
        stock,
      },
      { new: true },
    )

    res.json(updated)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Size Update Failed.')
  }
})
