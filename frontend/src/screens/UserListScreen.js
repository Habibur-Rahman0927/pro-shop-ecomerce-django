import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import FormContainer from '../component/FormContainer'
import { useSelector, useDispatch} from 'react-redux'
import { deleteUser, listUser, login, register } from '../actions/userAction'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { LinkContainer } from 'react-router-bootstrap'

const UserListScreen = ({history}) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users } = userList
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUser())
        }else{
            history.push('/login')
        }
    },[dispatch, history, userInfo, successDelete])
    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this users?')){
            dispatch(deleteUser(id))
        }
            
    }
  return (
    <div>
        <h1>User List</h1>
        {loading ? <Loader/>
        : error ? <Message variant='danger'>{error}</Message>
        : (
            <Table striped responsive bordered hover className='table-sm'>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ?
                             (<i className='fas fa-check' style={{color: 'green'}}></i>)
                             : (<i className='fas fa-check' style={{color: 'red'}}></i>)}
                             </td>
                             <td>
                                 <LinkContainer to={`/admin/user/${user._id}`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                 </LinkContainer>
                                 <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                        <i className='fas fa-trash'></i>
                                </Button>
                             </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </div>
  )
}

export default UserListScreen