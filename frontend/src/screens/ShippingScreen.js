import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../component/FormContainer'
import { useSelector, useDispatch} from 'react-redux'
import { login, register } from '../actions/userAction'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { saveShippingAddress } from '../actions/cartAction'
import CheckOutSteps from '../component/CheckOutSteps'

const ShippingScreen = ({history}) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {shippingAddres} = cart
    const [address, setAddress] = useState(shippingAddres.address)
    const [city, setCity] = useState(shippingAddres.city)
    const [postalCode, setPostalCode] = useState(shippingAddres.postalCode)
    const [country, setCountry] = useState(shippingAddres.country)
    

    const submiteHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }
  return (
    <FormContainer>
        <CheckOutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submiteHandler}>
            <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        required
                        type='text' 
                        placeholder='Enter address'
                        value={address ? address : ''} 
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                        required
                        type='text' 
                        placeholder='Enter city'
                        value={city ? city : ''} 
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'>
                    <Form.Label>postalCode</Form.Label>
                    <Form.Control 
                        required
                        type='text' 
                        placeholder='Enter postalCode'
                        value={postalCode ? postalCode : ''} 
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
                    <Form.Label>country</Form.Label>
                    <Form.Control 
                        required
                        type='text' 
                        placeholder='Enter country'
                        value={country ? country : ''} 
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
            </Form.Group>
            <br />
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen