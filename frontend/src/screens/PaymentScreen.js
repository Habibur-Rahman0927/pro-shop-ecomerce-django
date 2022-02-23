import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartAction'
import CheckOutSteps from '../component/CheckOutSteps'
import FormContainer from '../component/FormContainer'

const PaymentScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddres} = cart
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    if (!shippingAddres.address){
        history.push('/shipping')
    }
    const submiteHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
  return (
    <FormContainer>
        <CheckOutSteps step1 step2 step3 />
        <Form onSubmit={submiteHandler}>
        <Form.Group controlId='country'>
                    <Form.Label>Select Method</Form.Label>
                    <Col>
                        <Form.Check 
                            type='radio' 
                            label='PayPal or Credit Card'
                            id="paypal"
                            name="paymentMethod"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}>

                        </Form.Check>
                    </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen