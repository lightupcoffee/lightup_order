import Image from 'next/image'
const OrderSuccessModal = () => {
  return (
    <div>
      <div className="pointer-events-none fixed inset-0 bg-primary-500 transition-opacity"></div>
      <div className="pointer-events-auto fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed left-1/2 top-1/2  w-72 max-w-full -translate-x-1/2 -translate-y-1/2 transform rounded-4xl bg-secondary px-4 py-6 text-center ">
            <div className="pb-2">
              <Image className="mx-auto" src="/images/check-badge.svg" alt="check-badge" width={48} height={48} />
            </div>
            <p className="h1 mb-4">已收到訂單</p>
            <div className="c2">請稍後片刻，餐點將為您準備</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccessModal
