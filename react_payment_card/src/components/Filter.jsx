import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import { CartContext } from '../context/Context';

const Filter = () => {
    const {prodState:{ byStock,byFastDelivery,byRating, sort}, prodDispatch } = useContext(CartContext);
   
  return (
    <div className="filter">
        <span className="title"> Filter Products </span>
        <span>
            <Form.Check 
            inline
            label="Ascending"
            onChange={() => 
            prodDispatch({
                type: 'SORT_BY_PRICE',
                payload: "lowToHigh"
            })}
            checked={ sort === 'lowToHigh' ? true : false}
            name="group1"
            type="radio"
            id={'inline-1'} 
            />
        </span>
        <span>
            <Form.Check 
            inline
            label="Descending"
            onChange={() => 
            prodDispatch({
                type:'SORT_BY_PRICE',
                payload: 'highToLow'
            })}
            checked={sort === 'hightToLow' ? true : false}
            name="group1"
            type="radio"
            id={'inline-2'} 
            />
        </span>

        <span>
            <Form.Check 
            inline
            label="Include Out of Stock"
            name="group1"
            type="checkbox"
            id={'inline-3'} 
            />
        </span>
        <span>
            <Form.Check 
            inline
            label="Fast Delivery Only"
            onChange={() =>
            prodDispatch({
                type:'FILTER_BY_DELIVERY',
            })}
            checked={byFastDelivery}
            name="group1"
            type="checkbox"
            id={'inline-4'} 
            />
        </span>
        <span>
            <label style={{ paddingRight : 10}}>Rating :</label>
            <Rating 
             rating={byRating}
            style={{ cursor : "pointer" }}
            onClick={(i) =>
                prodDispatch({
                    type:'FILTER_BY_RATING',
                    payload: i +1,
                })} />
        </span>
        <Button variant="light"
        onClick={() => 
        prodDispatch({
            type: "CLEAR_FILTERS"
        })}>Clear Filters</Button>
    </div>
  )
}

export default Filter