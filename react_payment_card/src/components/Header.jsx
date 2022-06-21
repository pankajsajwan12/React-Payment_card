import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import FromControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge'
import { BsFillCartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/Context';
import { AiFillDelete } from 'react-icons/ai';
import Button from '@restart/ui/esm/Button';

const Header = () => {

    const { state: { cart},dispatch, prodState:{prodDispatch} } = useContext(CartContext);

  return (
    <Navbar bg='dark' variant="dark" style={{height : 80}}>
        <Container >
            <Navbar.Brand>
                <Link to="/">Shopping Cart </Link>
            </Navbar.Brand>
            <Navbar.Text className='search'>
                <FromControl
                 style={{ width: 500 }}
                 placeholder="Search Here"
                 className="m-auto"
                 onChange={(e) => {
                    prodDispatch({
                        type:'FILTER_BY_SEARCH',
                        payload: e.target.value,
                    })
                 }}/>
            </Navbar.Text>
            <Dropdown alignRight>
                <Dropdown.Toggle variant="success" >
                    <BsFillCartFill color="wihte" fontSize="25px"/>
                    <Badge>{cart.length}</Badge>
                </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth : 370 }}>
                {cart.length > 0 ?
                 ( <>
                 {
                     cart.map((prod) => (
                        <span className="cartItem" key={prod.id}>
                            <img 
                            src={prod.image}
                            className="cartItemImg"
                            alt={prod.name}
                            />
                            <div className="cartItemDetail">
                                <span>{prod.name}</span>
                                <span>₹ {prod.price.split(".")[0]}</span>
                            </div>
                            <AiFillDelete 
                            fontSize="20px"
                            style={{ cursor : 'pointer'}}
                            onClick={() => 
                            dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: prod,
                            })}/>
                        </span>
                     ))
                 }
                 <Link to="/cart" >
                    <Button style={{ width : '95%', margin : '0 10px'}}>Go To Cart</Button>
                 </Link>
                 </>
                 ):
                  (<span style={{ padding : 10 }}>Cart is Empty</span>) 
                }

                
            </Dropdown.Menu>
         </Dropdown>
    </Container>
    </Navbar>
  )
}

export default Header