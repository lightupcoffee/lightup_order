import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import CButton from './cbutton'
import ConfirmModal from './confirmModal'
import OrderSuccessModal from './orderSuccessModal'
const ShoppingCar = ({ car, no, onClose, removeCarItem, showShoppingCar }) => {
  const [totalAmount, settotalAmount] = useState(0)
  const [showConfirmModal, setshowConfirmModal] = useState(false)
  const [showOrderSuccessModal, setshowOrderSuccessModal] = useState(false)
  const [trashiconState, settrashiconState] = useState(false)
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
    <div
      className={`absolute right-0 top-0  h-full w-72  transition-all duration-300 ${showShoppingCar ? 'translate-x-0' : '-translate-x-[-18rem]'}`}
      onClick={onClose}
    >
      {/* <div className="pointer-events-auto fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div
              className=" hide-scrollbar flex  h-full w-72 flex-col overflow-y-scroll bg-primary py-12 text-secondary "
              onClick={stopClick}
            >
              <div className="flex items-center justify-between  px-5 pb-3">
                <div className="h1">My Order</div>
                <div className=" c1 rounded-4xl bg-secondary px-2 py-1 text-primary">Table {no}</div>
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
                        <div className="c1 ">NT${item.product.price}</div>
                      </div>
                      <div className="ml-auto flex items-center ">
                        <span className="h3">x</span>
                        <b className=" h1">{item.count}</b>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          removeCarItem(item.product.productid)
                        }}
                        onTouchStart={() => settrashiconState(true)}
                        onTouchEnd={() => settrashiconState(false)}
                        onMouseOver={() => settrashiconState(true)}
                        onMouseDown={() => settrashiconState(true)}
                        onMouseUp={() => settrashiconState(false)}
                        onMouseLeave={() => settrashiconState(false)}
                      >
                        <Image
                          src={`/images/trash_${trashiconState ? 'press' : 'default'}.svg`}
                          alt="delete"
                          width={24}
                          height={24}
                        />
                      </div>
                    </div>
                  ))}
              </div>
              <div className="px-5 py-3 ">
                <div className="h1 flex  justify-between py-3">
                  <span>Total</span>
                  <span>NT${totalAmount}</span>
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  <CButton text={'Line Pay'} mode={'secondary'} click={linepay}></CButton>
                  <CButton text={'現金結帳'} mode={'secondary'} click={cashpay}></CButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div
        className=" hide-scrollbar  flex h-full w-72 flex-col  bg-primary py-12 text-secondary  "
        onClick={stopClick}
      >
        <div className="flex items-center justify-between  px-5 pb-3">
          <div className="h1">My Order</div>
          <div className=" c1 rounded-4xl bg-secondary px-2 py-1 text-primary">Table {no}</div>
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
                  <div className="c1 ">NT${item.product.price}</div>
                </div>
                <div className="ml-auto flex items-center ">
                  <span className="h3">x</span>
                  <b className=" h1">{item.count}</b>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    removeCarItem(item.product.productid)
                  }}
                  onTouchStart={() => settrashiconState(true)}
                  onTouchEnd={() => settrashiconState(false)}
                  onMouseOver={() => settrashiconState(true)}
                  onMouseDown={() => settrashiconState(true)}
                  onMouseUp={() => settrashiconState(false)}
                  onMouseLeave={() => settrashiconState(false)}
                >
                  <Image
                    src={`/images/trash_${trashiconState ? 'press' : 'default'}.svg`}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            ))}
        </div>
        <div className="px-5 py-3 ">
          <div className="h1 flex  justify-between py-3">
            <span>Total</span>
            <span>NT${totalAmount}</span>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <CButton text={'Line Pay'} mode={'secondary'} click={linepay}></CButton>
            <CButton text={'現金結帳'} mode={'secondary'} click={cashpay}></CButton>
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
