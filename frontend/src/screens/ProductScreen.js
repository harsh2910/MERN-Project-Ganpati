import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions'

const ProductScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { product, loading, error } = productDetails

  useEffect(() => {
    // const fetchProduct = async () => {
    //   const { data } = await axios.get(`/api/products/${id}`)

    //   setProduct(data)
    // }
    // fetchProduct()
    dispatch(listProductDetails(id))
  }, [dispatch, id])

  
  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
        ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'> {/* remove border */}
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={parseInt(product.rating)} text={`${product.numReviews} reviews`} />
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price:</strong> ₹{product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Description:</strong> {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup varient='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Price:
                    </Col>
                    <Col>
                      <strong>₹{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      Status:
                    </Col>
                    <Col>
                      <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                      Add To Cart
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>          
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen