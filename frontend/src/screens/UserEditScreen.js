import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../component/FormContainer'
import { useSelector, useDispatch} from 'react-redux'
import { getUserDetails, login, register, updateUser } from '../actions/userAction'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { USER_UPDATE_RESET } from '../constants/userConstant'

const EditScreen = ({match, history}) => {
    const userId = match.params.id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user} = userDetails
    const userUpdate = useSelector(state => state.userUpdate)
    const {error: errorUpdate, loading:loadingUpdate, success} = userUpdate
    useEffect(() => {
        if(success){
            dispatch({
                type: USER_UPDATE_RESET
            })
            history.push('/admin/userlist')
        }else{
            if(!user.name || user._id !== Number(userId)){
                dispatch(getUserDetails(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
        
    }, [dispatch, history, success, user._id, user.email, user.isAdmin, user.name, userId])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: user._id, name, email, isAdmin}))
    }
  return (
      <>
    <Link to='/admin/userlist'>Go Back</Link>
    <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:(
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter name'
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type='email'
                    placeholder='Enter email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='isadmin'>
                <Form.Check
                    type='checkbox'
                    label='Is Admin'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}>

                </Form.Check>
            </Form.Group>
            <br/>
            <Button type='submit' variant='primary'>Register</Button> 
        </Form>
        )}
    </FormContainer>
    
    </>
  )
}

export default EditScreen