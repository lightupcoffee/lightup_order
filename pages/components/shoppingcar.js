import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import CButton from './cbutton'

const ShoppingCar = ({ car, tableid, paymenttypelist, onClose, removeCarItem, showShoppingCar, checkout }) => {
  //#region 滑動關閉購物車
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // 最小滑動距離
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null) // 當新的滑動動作開始時，清除之前的touchEnd
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    // 確保滑動距離足夠長才觸發關閉事件
    if (touchEnd - touchStart > minSwipeDistance) {
      // 向左滑動
      onClose() // 你的關閉購物車方法
    }
  }
  //#endregion 滑動關閉購物車

  const [totalAmount, settotalAmount] = useState(0)
  const [trashiconState, settrashiconState] = useState(null)
  useEffect(() => {
    const total = car.reduce((res, item) => {
      res += item.count * item.product.price
      return res
    }, 0)
    settotalAmount(total)
  }, [car])

  const stopClick = (event) => {
    event.stopPropagation()
  }

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      // className={`absolute right-0 top-0  h-full w-72  transition-all duration-300 ${showShoppingCar ? 'translate-x-0' : '-translate-x-[-18rem]'}`}
      className={`fixed right-0 top-0  h-full w-72 bg-white shadow-xl transition-transform duration-500 ${showShoppingCar ? 'translate-x-0' : 'translate-x-full'}`}
      onClick={onClose}
    >
      <div
        className=" hide-scrollbar  flex h-full w-72 flex-col  bg-primary py-12 text-secondary  "
        onClick={stopClick}
      >
        <div className="flex items-center justify-between  px-5 pb-3">
          <div className="h1">My Order</div>
          <div className=" c1 rounded-4xl bg-secondary px-2 py-1 text-primary">Table {tableid}</div>
        </div>
        <div className="hide-scrollbar  flex flex-1 flex-col gap-2 overflow-auto border-y-2 border-current px-5 py-4 ">
          {car &&
            car.map((item) => (
              <div
                key={item.product.productid}
                className="flex items-center gap-2.5 rounded-7xl border border-current px-6 py-2.5"
              >
                <div className="h3">
                  <div>{item.product.name}</div>
                  <div className="c1 ">NT ${item.product.price}</div>
                </div>
                <div className="ml-auto flex items-center ">
                  <span className="c1">x &nbsp; </span>
                  <b className=" h1">{item.count}</b>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    removeCarItem(item.product.productid)
                  }}
                  onTouchStart={() => settrashiconState(item.product.productid)}
                  onTouchEnd={() => settrashiconState(null)}
                  onMouseOver={() => settrashiconState(item.product.productid)}
                  onMouseDown={() => settrashiconState(item.product.productid)}
                  onMouseUp={() => settrashiconState(null)}
                  onMouseLeave={() => settrashiconState(null)}
                >
                  <Image
                    src={`/images/trash_${trashiconState === item.product.productid ? 'press' : 'default'}.svg`}
                    alt="delete"
                    width={24}
                    height={24}
                    priority={true}
                  />
                </div>
              </div>
            ))}
        </div>
        <div className="px-5  ">
          <div className="h1 flex  justify-between py-3">
            <span>Total</span>
            <span>NT ${totalAmount}</span>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            {/* <CButton
              text={'Line Pay'}
              mode={'secondary'}
              disable={!car || car.length <= 0}
              click={() => checkout(paymenttypelist.linepay)}
            ></CButton> */}
            <CButton
              text={'現金結帳'}
              mode={'secondary'}
              disable={!car || car.length <= 0}
              click={() => checkout(paymenttypelist.cash)}
            ></CButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCar
