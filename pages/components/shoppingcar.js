import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import CButton from './cbutton'
import ConfirmModal from './confirmModal'
import OrderSuccessModal from './orderSuccessModal'
const ShoppingCar = ({ car, no, onClose, removeCarItem }) => {
  const [totalAmount, settotalAmount] = useState(0)
  const [showConfirmModal, setshowConfirmModal] = useState(false)
  const [showOrderSuccessModal, setshowOrderSuccessModal] = useState(false)

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
  const cashpay = () => {
    setshowConfirmModal(true)
  }
  const confirmModalCancel = () => {
    setshowConfirmModal(false)
  }
  const confirmModalConfirm = () => {
    console.log('showConfirmModal', showConfirmModal)
    console.log('showOrderSuccessModal', showOrderSuccessModal)
    setshowConfirmModal(false)
    setshowOrderSuccessModal(true)
  }
  const orderSuccessModalClose = () => {
    setshowOrderSuccessModal(false)
    onClose()
    removeCarItem(-1)
  }
  return (
    <div className="relative z-20" onClick={onClose}>
      <div className="pointer-events-auto fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div
              className=" flex h-full  w-72 flex-col overflow-y-scroll bg-primary py-12 text-secondary "
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
                      key={item.product.productid}
                      className="flex items-center gap-4 rounded-7xl border border-current py-2 pl-6 pr-4"
                    >
                      <div className=" font-bold">
                        <div>{item.product.name}</div>
                        <div className="text-sm ">NT${item.product.price}</div>
                      </div>
                      <div className="ml-auto flex items-center font-bold tracking-wide">
                        <span>x</span>
                        <b className=" text-2xl">{item.count}</b>
                      </div>
                      <div
                        onClick={() => {
                          removeCarItem(item.product.productid)
                        }}
                      >
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
                  <CButton text={'Line Pay'} mode={'secondary'} click={linepay}></CButton>
                  <CButton text={'現金結帳'} mode={'secondary'} click={cashpay}></CButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          text={'確認結帳?'}
          canceltext={'再想一下'}
          confirmtext={'確定'}
          onCancel={confirmModalCancel}
          onConfirm={confirmModalConfirm}
        ></ConfirmModal>
      )}
      {showOrderSuccessModal && <OrderSuccessModal onClose={orderSuccessModalClose}></OrderSuccessModal>}
    </div>
  )
}

export default ShoppingCar
