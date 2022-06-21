import Button from '@restart/ui/esm/Button';
import React, { useContext, useEffect, useState } from 'react'
import { Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { CartContext } from '../context/Context'
import Rating from './Rating';

const Cart = () => {
  const { state :{ cart}, dispatch } = useContext(CartContext);
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(cart.reduce((acc,curr) => acc +Number(curr.price)*curr.qty, 0));
  }, [cart])
  return (
    <div className="Home">
      <div className="productContainer">
         <ListGroup>
           {
             cart.map((prod) => (
               <ListGroup.Item key={prod.id}>
                <Row>
                  <Col>
                   <Image src={prod.image} alt={prod.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <span>{prod.name}</span>
                  </Col>
                  <Col md={2}>{prod.price}</Col>
                  <Col md={2}>
                  <Rating rating={prod.ratings} />
                  </Col>
                  <Col>
                   <Form.Control
                    as="select" 
                    value={prod.qty}
                    onChange={(e)=>
                    dispatch({
                      type: "CHANGE_CART_QTY",
                      payload : {
                        id: prod.id,
                        qty: e.target.value,
                      },
                    })}>
                      {[...Array(prod.inStock).keys()].map((x) => (
                        <option key={x +1}>{x +1}</option>
                      ))}
                   </Form.Control>
                  </Col>
                  <Col>
                      <Button 
                      type="button"
                      variant="light"
                      onClick={() =>
                      dispatch({
                        type:"REMOVE_FROM_CART",
                        payload: prod,
                      })}>
                        <AiFillDelete fontSize="20px" />
                      </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
             ))
           }
           </ListGroup> 
        </div>
           <div className="filter summary">
              <span className="title">Subtotal ({cart.length}) items</span>
              <span style={{ fontWeight : 700 , fontSize : 20 }}>Total : ₹ {total}</span>
              <Button type="button" disabled={cart.length === 0}>Proceed to Checkout</Button>
           </div>
      
    </div>
  )
}

export default Cart