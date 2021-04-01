import Product from '../models/product.js'
import Cart from '../models/Cart.js'
import User from '../models/user.js'

export const addToCart = asyncHandler(async (req, res) => {
    let {
      product,
      name,
      image,
      price,
      description,
      stock,
      size,
      qty,
      color,
    } = req.body
  
    const user = await User.findById(req.user.id)
    const productCurrent = await Product.findOne({ slug: req.params.slugProduct })
    const cartExist = await Cart.findOne({ orderdBy: req.user.id }, { name })
    try {
      if (!cartExist) {
        const cartItems = new Cart({
          product,
          name,
          image,
          price: Number(price),
          description,
          stock: Number(stock),
          size,
          color,
          qty: Number(qty),
          orderedBy: req.user.id,
        })
        
        productCurrent.userAddedToCart.push(req.user.id)
        await productCurrent.save()
  
        const cartCreated = await cartItems.save()
        if (cartCreated) {
          user.cart.push(cartCreated._id)
          await user.save()
        }
      } else {
        cartExist.qty += qty
        await cartExist.save()
      }
    } catch (error) {
      res.status(400)
      throw new Error('Add To Cart Failed.')
    }
  })
  export const removeCartItemFromUser = asyncHandler((req, res) => {
    try {
      User.updateOne(
        { _id: req.user.id },
        { $pull: { cart: `${req.params.cartId}` } },
      )
      res.json({
        message: 'Delete From Cart Success.',
      })
    } catch (error) {
      console.log(error)
      res.status(400)
      throw new Error('Delete From Cart Success.')
    }
  })
  