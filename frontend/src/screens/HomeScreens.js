import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from "react-bootstrap";
import Product from '../components/Product'
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';

const HomeScreens = () => {

  const dispatch = useDispatch()
  const { keyword } = useParams()
  const { pageNumber = 1 } = useParams()

  const productList = useSelector(state => state.productList)
  const { products, loading, error, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])


  return (
    <>
      <Meta />
      {!keyword ? <ProductCarousel /> : <Link className='btn btn-light my-3' to='/'>Go Back</Link>}
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>

            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
        </>
      )}
    </>
  )
}

export default HomeScreens