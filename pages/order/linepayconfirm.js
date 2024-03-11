import React, { useState, useEffect } from 'react'
import axios from '../../utils/axiosInstance'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Spinner from '../components/spinner'
export default function LinepayConfirm() {
  const router = useRouter()
  const { tableId, transactionId, orderId, linepaysuccess } = router.query
  const [showOrderSuccessModal, setshowOrderSuccessModal] = useState(false)

  useEffect(() => {
    // 確保路由參數準備就緒
    if (router.isReady) {
      if (linepaysuccess) {
        setshowOrderSuccessModal(true)
      } else {
        confirmPayment()
      }
    }
  }, [router.isReady])

  const confirmPayment = async () => {
    if (!tableId || !transactionId || !orderId) {
      router.push(`/?tableid=${tableId}&linepayerror=true`)
    }

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
        console.log('success')
        setshowOrderSuccessModal(true)
        router.replace(
          {
            pathname: router.pathname,
            query: {
              tableid: tableId,
              transactionId: transactionId,
              orderId: orderId,
              linepaysuccess: true,
            },
          },
          undefined,
          { shallow: true },
        ) // 使用shallow選項防止不必要
      })
      .catch((error) => {
        console.log('error')
        router.push(`/?tableid=${tableId}&linepayerror=true`)
        console.error('Failed to fetch data:', error)
      })

    // setTimeout(() => {
    //   router.push(`/?tableid=${tableId}`)
    // }, 3000)
  }
  return (
    <div className="fixed inset-0 bg-primary ">
      <div className="h1 fixed left-1/2  top-1/2 w-72 max-w-full -translate-x-1/2 -translate-y-1/2 transform rounded-4xl bg-secondary px-4 py-10 text-center">
        <div>
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
              <p className="h1 mb-4">訂單建立成功</p>
              <div className="c2">您的訂單編號為 #{orderId.toString().padStart(6, '0')}</div>
              <div className="c2">請稍待片刻，餐點將為您準備</div>
            </div>
          ) : (
            <div>
              <div className={'mx-auto h-12 w-12 pb-8'}>
                <Spinner></Spinner>
              </div>

              <p className="h1 mb-4">確認付款中...</p>
              <div className="c2">請不要離開此頁面</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
