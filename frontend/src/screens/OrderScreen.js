import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'
import { useParams } from 'react-router-dom'


const OrderScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const orderId = id

    const [lod, setLod] = useState(false)

    const [sdkReady, setSdkReady] = useState(false)

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    if (!loading) {
        const addDecimal = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimal(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }


    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay || successDeliver || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, navigate, userInfo, orderId, successPay, successDeliver, order])

    function loadRazorPay() {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onerror = () => {
            alert('Razorpay SDK failed to load.Are you online?');
        };
        script.onload = async () => {
            try {
                setLod(true);
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Auth: `Bearer ${userInfo.token}`
                    }
                }
                const result = await axios.post('/api/orders/create-order', {
                    amount: `${(order.totalPrice * 100).toFixed(0)}`,
                }, config);
                const { amount, id: order_id, currency } = result.data;
                const {
                    data: { key: razorpaykey },
                } = await axios.get('/get-razorpay-key');

                const options = {
                    key: razorpaykey,
                    amount: amount.toString(),
                    currency: currency,
                    name: 'GANPATI',
                    description: `ORDER ID: ${order._id}`,
                    order_id: order_id,
                    handler: async function (response) {
                        const result = await axios.post(`/api/orders/${order._id}/pay-order`, {
                            amount: amount,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                        }, config);
                        alert(result.data.msg);
                        if (response.razorpay_payment_id) {
                            const paymentResult = {
                                id: response.razorpay_payment_id,
                                status: "COMPLETED",
                                update_time: Date.now(),
                                payer: {
                                    email_address: userInfo.email,
                                },
                            }
                            dispatch(payOrder(orderId, paymentResult))
                        }

                    },
                    prefill: {
                        name: '',
                        email_address: '',
                        contact: '',
                    },
                    notes: {
                        address: 'example address',
                    },
                    theme: {
                        color: '#80c0f0',
                    },
                };

                setLod(false);
                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } catch (err) {
                console.log(err);
                alert(err);
                setLod(false);
            }
        };
        document.body.appendChild(script);
    }

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader /> : error ? <Message>{error}</Message> : <>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name:</strong> {order.user.name}</p>
                        <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Address</strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <Message variant={'success'}>Delivered on {order.deliveredAt}</Message> : <Message variant={'danger'}>Not Delivered</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? <Message variant={'success'}>Paid on {order.paidAt}</Message> : <Message variant={'danger'}>Not Paid</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? (
                            <Message>Order is empty</Message>
                        ) : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.productId}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                        <ListGroup>

                        </ListGroup>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>₹{order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>₹{order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>GST</Col>
                                <Col>₹{order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>₹{order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {order.paymentMethod ?? localStorage.getItem('paymentMethod') === "RazorPay" ? (
                                    <Button style={{ width: "100%" }} disabled={lod} onClick={loadRazorPay}>Pay with RazorPay</Button>
                                ) : (
                                    <>
                                        {loadingPay && <Loader />}
                                        {!sdkReady ? <Loader /> : (
                                            <PayPalButton
                                                amount={Math.ceil(order.totalPrice/75).toFixed(0)}
                                                onSuccess={successPaymentHandler}
                                            />
                                        )}
                                    </>
                                )}


                            </ListGroup.Item>
                        )}
                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button type='button' style={{ width: "100%" }} className='btn btn-block' onClick={deliverHandler}>Mark As Delivered</Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}


export default OrderScreen