// pages/index.js
import React, { useState, useEffect } from 'react'
import axios from '../../utils/axiosInstance'

function Product({ categoryid, onBack }) {
  const [products, setproducts] = useState([])
  useEffect(() => {
    axios
      .get('/product/getAllProduct')
      .then((res) => {
        setproducts(res.data.filter((x) => x.categoryid === categoryid && x.active == true))
      })
      .catch((error) => {
        console.error('Failed to fetch getAllProduct:', error)
      })
  }, [categoryid])
  return (
    <div className="container mx-auto px-4 ">
      <button onClick={onBack}>Back</button>
      <ul role="list" className="divide-y ">
        {products.map((product) => (
          <li
            key={product.productid}
            className="group relative flex cursor-pointer justify-between border-current pb-2 pt-7 text-2xl font-black text-primary"
          >
            <div>{product.categoryid} </div>
            <div>{product.name} </div>
            <div>{product.price} </div>
            <div>{product.active} </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Product
