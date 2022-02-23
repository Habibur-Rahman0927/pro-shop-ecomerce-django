import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productAction'
import Product from '../component/Product'
import Loader from '../component/Loader'
import Message from '../component/Message'
import Paginate from '../component/Paginate'
import ProductCarousel from '../component/ProductCarousel'

const HomeScreen = ({history}) => {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { error, loading, products, page, pages } = productList
  let keyword = history.location.search
  useEffect(() => {
    dispatch(listProducts(keyword))
  },[dispatch, keyword])
  return (
    <div>
      {!keyword && <ProductCarousel/>}
        <h1>Latest Products</h1>
        { loading ? <Loader />
          : error ? <Message variant='danger'>{ error }</Message>
          : <div>
            <Row>
              {products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                  </Col>
              ))}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword}/>
          </div>
        
        }
    </div>
  )
}

export default HomeScreen