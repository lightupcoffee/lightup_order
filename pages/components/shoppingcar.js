import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import CButton from './cbutton'
const ShoppingCar = ({ car, no, onClose }) => {
  const [totalAmount, settotalAmount] = useState(0)

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
  const linepay = () => {}
  return (
    <div className="relative z-20" onClick={onClose}>
      <div className="bg-primary-500 pointer-events-none fixed inset-0 transition-opacity"></div>

      <div className="pointer-events-auto fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div
              id="contant"
              className=" flex h-full w-[18rem] flex-col overflow-y-scroll bg-primary py-12 text-secondary shadow-xl"
              onClick={stopClick}
            >
              <div className="flex items-center justify-between  px-5 pb-4">
                <div className="text-2xl font-bold">My Order</div>
                <div className=" rounded-xl bg-secondary px-2 py-1 text-sm font-bold text-primary">Table {no}</div>
              </div>
              <div className="hide-scrollbar flex flex-1 flex-col gap-2 overflow-auto border-y-2 border-current px-5 py-4 ">
                {car &&
                  car.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-4 rounded-full border border-current px-6 py-2"
                    >
                      <div className=" font-bold">
                        <div>{item.product.name}</div>
                        <div className="text-sm ">NT${item.product.price}</div>
                      </div>
                      <div className="ml-auto flex items-center gap-1 font-bold tracking-wide">
                        <span>x</span>
                        <b className=" text-2xl">{item.count}</b>
                      </div>
                      <div>
                        <Image src="/images/trash_shadow.svg" alt="delete" width={24} height={24} />
                      </div>
                    </div>
                  ))}
              </div>
              <div className="px-5 py-3 ">
                <div className="flex justify-between  py-3 text-2xl font-bold">
                  <span>Total</span>
                  <span>NT${totalAmount}</span>
                </div>
                <div className="mt-5 flex flex-col gap-4">
                  <CButton text={'Line Pay'} mode={'dark'} click={linepay}></CButton>
                  <CButton text={'現金結帳'} mode={'dark'} click={linepay}></CButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCar
