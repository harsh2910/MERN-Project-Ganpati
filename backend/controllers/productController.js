import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js'

// @dec Fetch all products
// @routs GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            },
        } : {}
    
    const count = await Product.count({...keyword})
    const products =  await Product.find({...keyword}).limit(pageSize).skip((page - 1) * pageSize)

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
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

// @dec Create new review
// @routs POST /api/products/:id/reviews
// @access  Private
const creatProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)

    if(product){
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if(alreadyReviewed){
            res.status(400)
            throw new Error('You have already reviewed this product')
        }
    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
    }

    product.reviews.push(review)
    product.rating = product.reviews.reduce((acc, curr) => acc + curr.rating, 0)/product.reviews.length 
    product.numReviews = product.reviews.length
    const updatedProduct = await product.save()
    res.status(201).json({message: 'Review added'})

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
    updateProduct,
    creatProductReview
}