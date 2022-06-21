import React, { useContext } from 'react'
import { CartContext } from "../context/Context"
import { CartState } from '../context/Context'
import Filter from './Filter';
import SingleProduct from './SingleProduct';
import './styles.css'

const Home = () => {

   const { state: { products },prodState:{sort, byStock, byFastDelivery, byRating, searchQuery }, } = useContext(CartContext);
   console.log('products',products);

  //  const { state } = CartState();
  //  console.log("CartState", state);
  const transformProducst = () => {
    let srotedProdcuts = products;

    if(sort) {
      srotedProdcuts = srotedProdcuts.sort((a,b) => (
        sort === 'lowToHigh' ? a.price-b.price : b.price - a.price
      ))
    }
    if(!byStock) {
      srotedProdcuts = srotedProdcuts.filter((prod) => prod.inStock);
    }

    if(byFastDelivery) {
      srotedProdcuts = srotedProdcuts.filter((prod) => prod.fastDelivery);
    }

    if(byRating) {
      srotedProdcuts = srotedProdcuts.filter((prod) => prod.ratings >= byRating)
    }

    if(searchQuery) {
      srotedProdcuts = srotedProdcuts.filter((prod) => prod.name.toLowerCase().includes(searchQuery));
    }
    return srotedProdcuts;
  }
  return (
    <div className="Home">
      <Filter />
      <div className="productContainer">
      {
        transformProducst().map((prod) => {
          return <SingleProduct  key={prod.id} prod={prod}/>
        })
      }
      </div>
    </div>
  )
}

export default Home