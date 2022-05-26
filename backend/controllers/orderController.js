import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js'
import Razorpay from 'razorpay'

// @dec Create new order
// @routs POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { 
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if(orderItems && orderItems.length===0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const order = await Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createrOrder = await order.save()

        res.status(201).json(createrOrder)
    }

})

// @dec Get order by id
// @routs GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    
    if(order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @dec Update order to paid
// @routs GET /api/orders/:id/paid
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    
    if(order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @dec razorpay instance create
// @routs POST /api/orders/create-order
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
    console.log(req.body)
    try{
        const instance=new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_SECRET,
        });
        const options = {
            amount: req.body.amount,
            currency: 'INR',
        };
        const order = await instance.orders.create(options)
        if(!order)return res.status(500).send('Some error occured');
        res.send(order);
      }catch(error){
        res.status(500).send(error);
      }
})

// @dec razorpay payment
// @routs GET /api/orders/:id/pay-order
// @access  Private
const payOrder = asyncHandler(async (req, res) => {
    try {
        const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature }= req.body;
        const order = await Order.findById(req.params.id);
        order.isPaid = true,
        order.paidAt = Date.now(),
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
        },
        order.amount = amount,
        order.razorpay = {
            orderId:razorpayOrderId,
            paymentId:razorpayPaymentId,
            signature:razorpaySignature,
        }
        await order.save()
        res.send({
            msg:'Payment was successfull',
        });
        } catch(error) {
            console.log(error);
            res.status(500).send(error);
        }
})


// @dec Update order to delivered
// @routs GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    
    if(order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @dec Get logged in user orders
// @routs GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id })
    res.json(order)
})

// @dec Get all orders
// @routs GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
    createOrder,
    payOrder
}