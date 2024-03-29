import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../component/FormContainer'
import { useSelector, useDispatch} from 'react-redux'
import { login } from '../actions/userAction'
import Message from '../component/Message'
import Loader from '../component/Loader'

const LoginScreen = ({location, history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo} = userLogin


    useEffect(() => {
        if (userInfo){
            history.push(redirect)
        }
    }, [history, redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
  return (
    <>
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type='email' 
                    placeholder='Enter email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='Enter password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <br/>
            <Button type='submit' variant='primary'>Sing In</Button> 
        </Form>
        <Row className='py-3'>
            <Col>
                New Custmer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Sing Up</Link>
            </Col>
        </Row>
    </FormContainer>    
    </>
  )
}

export default LoginScreen