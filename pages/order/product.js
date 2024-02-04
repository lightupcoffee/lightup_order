// pages/index.js
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

function Product({ products, category, car, editcar, onBack }) {
  const [currentitem, setcurrentitem] = useState(false)
  return (
    <div className="flex h-full  flex-col">
      <div className="item-center flex cursor-pointer border-b-2 border-current py-4 pt-9" onClick={onBack}>
        <span className="my-auto">
          <Image
            src="/images/play.svg" // 圖片的路徑
            alt="back" // 圖片描述
            width={18} // 圖片的寬度
            height={18} // 圖片的高度
          />
        </span>
        <div className="text-2xl"> {category.name}</div>
      </div>
      <div className="hide-scrollbar flex-1 overflow-auto" style={{ maxHeight: '500px' }}>
        {products.map((product) => (
          <div
            onClick={() => {
              setcurrentitem(product.productid)
            }}
            key={product.productid}
            className={`mt-5 flex w-full items-center justify-between rounded-3xl border border-current px-6 py-3 text-start ${currentitem === product.productid ? 'bg-primary text-secondary' : ''} `}
          >
            <div>
              <div>{product.name} </div>
              <div className="text-sm">{product.description} </div>
              <div className="mt-2 text-xs ">NT ${product.price} </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation() // 阻止事件冒泡
                  editcar({ type: 'minus', productid: product.productid })
                }}
              >
                <Image
                  src="/images/minus.svg" // 圖片的路徑
                  alt="minus" // 圖片描述
                  width={24} // 圖片的寬度
                  height={24} // 圖片的高度
                />
              </button>
              <span className="font-bold">{car[product.productid] ?? 0}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation() // 阻止事件冒泡
                  editcar({ type: 'plus', productid: product.productid })
                }}
              >
                <Image
                  src="/images/plus.svg" // 圖片的路徑
                  alt="plus" // 圖片描述
                  width={24} // 圖片的寬度
                  height={24} // 圖片的高度
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product
