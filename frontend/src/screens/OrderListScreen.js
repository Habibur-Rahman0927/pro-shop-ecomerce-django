import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import FormContainer from '../component/FormContainer'
import { useSelector, useDispatch} from 'react-redux'
import { deleteUser, listUser, login, register } from '../actions/userAction'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { listOrders } from '../actions/orderAction'

const OrderListScreen = ({history}) => {
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders } = orderList
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }else{
            history.push('/login')
        }
    },[dispatch, history, userInfo])
  return (
    <div>
        <h1>Orders</h1>
        {loading ? <Loader/>
        : error ? <Message variant='danger'>{error}</Message>
        : (
            <Table striped responsive bordered hover className='table-sm'>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>
                                {order.isPaid ? order.paidAt : 
                                (
                                    <i className='fas fa-check' style={{color: 'red'}}></i>
                                )}
                            </td>
                            <td>
                                {order.isDelivered ? order.isDeliveredAt : 
                                (
                                    <i className='fas fa-check' style={{color: 'red'}}></i>
                                )}
                            </td>
                             <td>
                                 <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant='light' className='btn-sm'>
                                        Details
                                    </Button>
                                 </LinkContainer>
                             </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </div>
  )
}

export default OrderListScreen