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
        <div className="h1 "> {category?.name}</div>
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
              className={` mt-5 flex w-full cursor-pointer items-center justify-between rounded-7xl border border-current px-6 py-3 text-start 
              ${(car[product.productid] && car[product.productid]?.count > 0) || currentitem === product.productid ? 'bg-primary text-secondary' : ''} `}
            >
              <div>
                <div className="h2">{product.name} </div>
                <div className="c1">{product.description} </div>
                <div className="c2 mt-2">NT ${product.price} </div>
              </div>

              {((car[product.productid] && car[product.productid]?.count > 0) || currentitem === product.productid) && (
                <div className="item-center flex gap-2   ">
                  <Image
                    className="cursor-pointer "
                    onClick={(e) => {
                      e.stopPropagation() // 阻止事件冒泡
                      editcar({ type: 'minus', product: product })
                    }}
                    src="/images/minus.svg"
                    alt="minus"
                    width={24}
                    height={24}
                  />

                  <div className="h2 my-auto text-center">{car[product.productid]?.count ?? 0}</div>

                  <Image
                    className="cursor-pointer "
                    onClick={(e) => {
                      e.stopPropagation() // 阻止事件冒泡
                      editcar({ type: 'plus', product: product })
                    }}
                    src="/images/plus.svg"
                    alt="plus"
                    width={24}
                    height={24}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Product
