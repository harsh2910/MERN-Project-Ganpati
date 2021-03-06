import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
    const Navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        Navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('RazorPay')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        Navigate('/placeorder')
    }
    return (<FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='Paypal'
                        name='paymentMethod'
                        value='PayPal'
                        onClick={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                    <br />
                    <Form.Check
                        type='radio'
                        label='UPI, WALLET, Card'
                        id='RazorPay'
                        name='paymentMethod'
                        value='RazorPay'
                        checked
                        onClick={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                    <br />
                    {/* <Form.Check
                type='radio'
                label='Stripe'
                id='Stripe'
                name='paymentMethod'
                value='Stripe'
                onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check> */}
                </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
                Continue
            </Button>

        </Form>
    </FormContainer>
    )
}

export default PaymentScreen