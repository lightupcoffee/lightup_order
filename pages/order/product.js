// pages/index.js
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

function Product({ products, category, car, editcar, onBack, showShoppingCar }) {
  const [currentitem, setcurrentitem] = useState(false)
  useEffect(() => {
    if (showShoppingCar) {
      setcurrentitem(null)
    }
  }, [showShoppingCar])
  return (
    <div className="flex h-full  flex-col">
      <div className="item-center flex cursor-pointer border-b-2 border-current py-4 pt-9" onClick={onBack}>
        <span className="my-auto">
          <Image src="/images/play.svg" alt="back" width={18} height={18} />
        </span>
        <div className="text-2xl"> {category?.name}</div>
      </div>
      <div className="hide-scrollbar flex-1 overflow-auto" style={{ maxHeight: '500px' }}>
        {products &&
          products.map((product) => (
            <div
              onClick={() => {
                if (currentitem !== product.productid) {
                  setcurrentitem(product.productid)
                } else {
                  setcurrentitem(null)
                }
              }}
              key={product.productid}
              className={`mt-5 flex w-full cursor-pointer items-center justify-between rounded-7xl border border-current px-6 py-3 text-start 
              ${(car[product.productid] && car[product.productid]?.count > 0) || currentitem === product.productid ? 'bg-primary text-secondary' : ''} `}
            >
              <div>
                <div>{product.name} </div>
                <div className="text-sm">{product.description} </div>
                <div className="mt-2 text-xs ">NT ${product.price} </div>
              </div>

              {((car[product.productid] && car[product.productid]?.count > 0) || currentitem === product.productid) && (
                <div className="item-center flex flex-col  md:flex-row md:gap-4 ">
                  <button
                    className="cursor-pointer md:order-3"
                    onClick={(e) => {
                      e.stopPropagation() // 阻止事件冒泡
                      editcar({ type: 'plus', product: product })
                    }}
                  >
                    <Image src="/images/plus.svg" alt="plus" width={24} height={24} />
                  </button>
                  <div className="text-center font-bold md:order-2">{car[product.productid]?.count ?? 0}</div>
                  <button
                    className="cursor-pointer md:order-1"
                    onClick={(e) => {
                      e.stopPropagation() // 阻止事件冒泡
                      editcar({ type: 'minus', product: product })
                    }}
                  >
                    <Image src="/images/minus.svg" alt="minus" width={24} height={24} />
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Product
