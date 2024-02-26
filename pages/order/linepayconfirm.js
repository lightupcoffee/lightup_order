import React, { useState, useEffect } from 'react'
import axios from '../../utils/axiosInstance'
import Image from 'next/image'
import { useRouter } from 'next/router'
export default function LinepayConfirm() {
  const router = useRouter()
  const { tableId, transactionId, orderId } = router.query
  const [showOrderSuccessModal, setshowOrderSuccessModal] = useState(false)

  useEffect(() => {
    // 確保路由參數準備就緒
    if (router.isReady) {
      confirmPayment()
    }
  }, [router.isReady])

  const confirmPayment = async () => {
    if (!tableId || !transactionId || !orderId) return

    await axios({
      method: 'post',
      url: '/pay/linepayConfirm',
      //API要求的資料
      data: {
        transactionId: transactionId,
        orderId: orderId,
      },
    })
      .then((res) => {
        console.log('confirmPaymentSuccess')
        setshowOrderSuccessModal(true)
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error)
      })

    setTimeout(() => {
      router.push(`/?tableid=${tableId}`)
    }, 3000)
  }
  return (
    <div className="fixed inset-0 bg-primary-500 transition-opacity">
      <div className="h1 fixed left-1/2  top-1/3 w-96 max-w-full -translate-x-1/2 -translate-y-1/2 transform rounded-4xl bg-secondary px-4 py-6 text-center">
        {showOrderSuccessModal ? (
          <div>
            <div className="pb-2">
              <Image
                className="mx-auto"
                src="/images/check-badge.svg"
                alt="check-badge"
                width={48}
                height={48}
                priority={true}
              />
            </div>
            <p className="h1 mb-4">已收到訂單</p>
            <div className="c2">請稍後片刻，餐點將為您準備</div>
          </div>
        ) : (
          <p className="mb-4">確認付款資訊... 請稍後</p>
        )}
      </div>
    </div>
  )
}
