import Product from '../models/product.js';
import asyncHandle from 'express-async-handler';
import slugify from 'slugify'

export const create = asyncHandle(async (req, res) => {
     const { 
          name, 
          description, 
          price, 
          category, 
          subs, 
          quantity, 
          sold, 
          images, 
          shipping, 
          color, 
          brand } = req.body;
     const existProduct = await Product.findOne({ name });
   try {
        const newProduct = new Product({
             name, 
             slug: slugify(name).toLowerCase(), 
             price, 
             description,
             category, 
             subs, 
             quantity, 
             sold, 
             images, 
             shipping, 
             color, 
             brand
          })
          const createProduct = await newProduct.save();

          res.json(createProduct);
   } catch (error) {
        console.log(error);
        if(existProduct) {
          res.status(400)
          throw new Error("Product already exists.");
        }
        res.status(400)
        throw new Error("Create Product Failed.");
   }
})
export const list = asyncHandle(async (req, res) => {
     const products = await Product.find()
          .populate('category', '_id name')
          .populate('subs')
          .sort([['createdAt', 'desc']])
          .limit(parseInt(req.params.count));
     if(products) {
          return res.status(200).json(products);
     } else {
          res.status(400)
          throw new Error("Product not found.")
     }
})
export const read = asyncHandle(async (req, res) => {
     let product = await Product.findOne({ slug: req.params.slug }).populate("category", "_id name");
     res.json(product);
 })
export const update = asyncHandle(async (req, res) => {
     try {
          if(req.body.name) {
               req.body.slug = slugify(req.body.name);
          }
          const updated = await Product.findOneAndUpdate({slug: req.params.slug}, req.body, {
               new: true
          }).exec();
          res.json(updated);
     } catch (error) {
          console.log(`Update Error: ${error}`);
          return res.status(400).send('Product update fail.')
     }
})
export const remove = asyncHandle(async (req, res) => {
     try {
         const deleted = await Product.findOneAndDelete({ slug: req.params.slug });
         res.json(deleted);
     } catch (error) {
         res.status(400)
         throw new Error("Product Delete failed.")
     }
 })