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

// @dec Create a products
// @routs POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id,
        image: '/images/product.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @dec Update a products
// @routs PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, categoty, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.categoty = categoty
        product.countInStock = countInStock
        
        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}