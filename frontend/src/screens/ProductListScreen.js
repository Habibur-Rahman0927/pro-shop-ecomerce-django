import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import FormContainer from '../component/FormContainer'
import { useSelector, useDispatch} from 'react-redux'
import { deleteUser, listUser, login, register } from '../actions/userAction'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { createProduct, listProducts, productDelete, productDeleteAction } from '../actions/productAction'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../component/Paginate'

const ProductListScreen = ({history}) => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products, pages, page } = productList
    const productDelete = useSelector(state => state.productDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete
    const productCreate = useSelector(state => state.productCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct } = productCreate
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    let keyword = history.location.search
    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if(!userInfo.isAdmin){
            history.push('/login')
        }
        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}`)
        }else{
            dispatch(listProducts(keyword))
        }
    },[dispatch, history, userInfo, successDelete, successCreate, keyword, createdProduct])
    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this Product?')){
            dispatch(productDeleteAction(id))
        }
            
    }
    const createProductHandler = () => {
        dispatch(createProduct())
    }
  return (
    <div>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col style={{textAlign: 'end'}}>
                <Button onClick={createProductHandler}>
                    <i className='fas fa-plus'></i>Create Products
                </Button>
            </Col>
        </Row>
        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingCreate && <Loader/>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading ? <Loader/>
        : error ? <Message variant='danger'>{error}</Message>
        : (
            <div>
                <Table striped responsive bordered hover className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                             <td>
                                 <LinkContainer to={`/admin/product/${product._id}`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                 </LinkContainer>
                                 <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                        <i className='fas fa-trash'></i>
                                </Button>
                             </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true} />
            </div>
        )}
    </div>
  )
}

export default ProductListScreen