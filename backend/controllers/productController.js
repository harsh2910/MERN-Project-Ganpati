import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js'

// @dec Fetch all products
// @routs GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products =  await Product.find({})

    res.json(products)
})


// @dec Fetch single products
// @routs GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @dec Delete a products
// @routs DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({message: 'Product deleted successfully'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


export {
    getProducts,
    getProductById,
    deleteProduct
}