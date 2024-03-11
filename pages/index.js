// pages/index.js
import React, { useState, useEffect } from 'react'
import axios from '../utils/axiosInstance'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Category from './order/category'
import Product from './order/product'
import NotificationModal from './components/notificationModal'
import ShoppingCar from './components/shoppingcar'
import ConfirmModal from './components/confirmModal'
import Dialog from './components/dialog'
function Home({ categorys, products }) {
  const paymenttypelist = { cash: '現金付款', linepay: 'Line Pay' }
  const router = useRouter()
  const { tableid, linepayerror } = router.query
  const [showNotificationModal, setshowNotificationModal] = useState(false)
  const [showproduct, setshowproduct] = useState(false)
  const [productlist, setproductlist] = useState([])
  const [selectedcategory, setselectedcategory] = useState(1)
  const [car, setcar] = useState({})
  const [carImageState, setcarImageState] = useState('empty')
  const [showShoppingCar, setshowShoppingCar] = useState(false)
  const [showConfirmModal, setshowConfirmModal] = useState(false)
  const [createOrderLoad, setcreateOrderLoad] = useState(false)
  const [showOrderSuccessModal, setshowOrderSuccessModal] = useState(false)
  const [paymenttype, setpaymenttype] = useState(paymenttypelist.cash)
  const [showLinePayErrorModal, setshowLinePayErrorModal] = useState(false)

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
    if (touchEnd !== null && Math.abs(touchStart - touchEnd) > minSwipeDistance) {
      // 向左滑動
      const val = touchStart - touchEnd

      setshowShoppingCar(val > 0) // 你的關閉購物車方法
    }
  }
  //#endregion 滑動關閉購物車

  const selectCategory = (target) => {
    setselectedcategory(target)
    setproductlist(products.filter((x) => x.categoryid === target.categoryid).sort((a, b) => a.sort - b.sort))
    setshowproduct(true)
  }
  const productBack = () => {
    setshowproduct(false)
  }

  useEffect(() => {
    if (!tableid) {
      router.push('./notableId')
      return
    }
    if (linepayerror) {
      setshowLinePayErrorModal(true)
      setTimeout(() => {
        //刪除linepayerror的query
        router.replace(
          {
            pathname: router.pathname,
            query: { tableid: tableid },
          },
          undefined,
          { shallow: true },
        ) // 使用shallow選項防止不必要
        setshowLinePayErrorModal(false)
      }, 5000)
    } else {
      const hasVisited = sessionStorage.getItem('hasVisited')
      if (!hasVisited) {
        setshowNotificationModal(true)
        sessionStorage.setItem('hasVisited', 'true')
      }
    }
  }, [])
  const handleClose = () => {
    setshowNotificationModal(false)
  }
  const editcar = (item) => {
    let newCar = { ...car }
    const key = item.product.productid
    if (!newCar[key]) {
      newCar[key] = {
        product: item.product,
        count: 0,
      }
    }
    switch (item.type) {
      case 'plus':
        newCar[key].count += 1
        break

      case 'minus':
        if (newCar[key].count >= 1) {
          newCar[key].count -= 1
        }
        if (newCar[key].count === 0) {
          delete newCar[key]
        }
        break
    }
    setcar(newCar)
  }

  const removeCarItem = (key) => {
    if (key === -1) {
      //結帳完成刪除全部購物車內容
      setcar({})
    } else {
      let newCar = { ...car }
      delete newCar[key]
      setcar(newCar)
    }
  }

  useEffect(() => {
    setcarImageState(Object.values(car).some((x) => x.count > 0) ? 'fill' : 'empty')
  }, [car])

  const confirmModalCancel = () => {
    setshowConfirmModal(false)
  }
  const confirmModalConfirm = async () => {
    if (!tableid || Object.keys(car).length == 0) return
    setcreateOrderLoad(true)
    await axios({
      method: 'post',
      url: '/order/createOrder',
      //API要求的資料
      data: {
        car: car,
        tableid: tableid,
        paymenttype: paymenttype,
      },
    })
      .then(async (res) => {
        if (paymenttype === paymenttypelist.linepay) {
          await linepay(res.data)
        }
        setshowConfirmModal(false)
        setshowOrderSuccessModal(true)
        setTimeout(() => {
          orderSuccessModalClose()
        }, 3000)
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error)
      })
      .finally(() => {
        setcreateOrderLoad(false)
      })
  }

  const orderSuccessModalClose = () => {
    removeCarItem(-1)
    setshowShoppingCar(false)
    setshowOrderSuccessModal(false)
    setshowproduct(false)
  }

  const linepay = async (order) => {
    await axios({
      method: 'post',
      url: '/pay/linepayRequest',
      //API要求的資料
      data: { order: order },
    })
      .then((res) => {
        console.log('linepayRequest', res)
        const paymentUrl = res.data.info.paymentUrl.web // 或根據需要使用app URL
        window.location.href = paymentUrl // 在網頁中重定向用戶
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error)
      })
  }
  return (
    <div className=" relative  " style={{ minHeight: 'calc(100vh + 10px)' }}>
      {showNotificationModal && <NotificationModal onClose={handleClose} />}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={(e) => {
          if (showShoppingCar) {
            e.stopPropagation() // 阻止事件冒泡
            setshowShoppingCar(false)
          }
        }}
        className={`transition-transform duration-500 ${showShoppingCar ? '-translate-x-72 xl:-translate-x-0' : ''}`}
      >
        <div className={`container mx-auto flex h-svh flex-1 transform flex-col px-5  lg:max-w-7xl `}>
          <div className="sticky top-0 bg-secondary pb-6">
            <div className="flex justify-between py-2 pb-4">
              <div className="cursor-pointer">
                <Image
                  src="/images/hamburger.svg" // 圖片的路徑
                  alt="hamburger" // 圖片描述
                  width={36} // 圖片的寬度
                  height={36} // 圖片的高度
                />
              </div>
              <div
                onClick={() => {
                  setshowShoppingCar(!showShoppingCar)
                }}
                className="cursor-pointer"
              >
                <Image
                  // src="/images/car.svg" // 圖片的路徑
                  src={`/images/shoppingcar_${carImageState}.svg`} // 圖片的路徑
                  alt="購物車" // 圖片描述
                  width={36} // 圖片的寬度
                  height={36} // 圖片的高度
                />
              </div>
            </div>
            <div className="mx-auto max-w-2xl ">
              <Image
                className="mx-auto"
                src="/images/logo_title.svg" // 圖片的路徑
                alt="star icon" // 圖片描述
                width={340} // 圖片的寬度
                height={100} // 圖片的高度
              />
            </div>
          </div>
          <div className="w-full max-w-2xl flex-1  sm:px-6 lg:max-w-7xl lg:px-8">
            {!showNotificationModal && !showproduct && (
              <Category categorys={categorys} onSelect={selectCategory}></Category>
            )}
            {!showNotificationModal && showproduct && (
              <Product
                products={productlist}
                category={selectedcategory}
                car={car}
                editcar={editcar}
                onBack={productBack}
                showShoppingCar={showShoppingCar}
              ></Product>
            )}
          </div>
          <div className="c1 w-full bg-secondary py-4">
            <div className="  flex  items-center justify-between  ">
              <div>CHANGHUA</div>
              <a href="https://www.instagram.com/light.up_coffee?igsh=MTlicGh5dzZ3bG9kcQ==" target="_blank">
                IG : Light.up_coffee
              </a>
            </div>
          </div>
        </div>
      </div>

      <ShoppingCar
        showShoppingCar={showShoppingCar}
        car={Object.values(car)}
        tableid={tableid}
        paymenttypelist={paymenttypelist}
        onClose={() => {
          setshowShoppingCar(false)
        }}
        removeCarItem={removeCarItem}
        checkout={(type) => {
          setpaymenttype(type)
          setshowConfirmModal(true)
        }}
      ></ShoppingCar>

      {showConfirmModal && (
        <ConfirmModal
          text={'確認結帳?'}
          canceltext={'再想一下'}
          confirmtext={'確定'}
          onCancel={confirmModalCancel}
          onConfirm={confirmModalConfirm}
          loading={createOrderLoad}
        ></ConfirmModal>
      )}

      <Dialog isOpen={showOrderSuccessModal} top={'50%'}>
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
        <div className="c2">
          請稍待片刻
          <br /> 稍後由服務人員至桌邊為您結帳
        </div>
      </Dialog>
      <Dialog isOpen={showLinePayErrorModal} top={'50%'}>
        <div className="pb-2">
          <Image
            className="mx-auto"
            src="/images/check-error.svg"
            alt="check-error"
            width={48}
            height={48}
            priority={true}
          />
        </div>
        <p className="h1 mb-4">付款失敗</p>
        <div className="c2">請重新點餐</div>
      </Dialog>
    </div>
  )
}

export async function getServerSideProps() {
  let categorys = []
  let products = []
  await axios
    .get('/category/getAllCategory')
    .then((res) => {
      categorys = res.data
    })
    .catch((error) => {
      console.error('Failed to fetch data:', error)
    })
  await axios
    .get('/product/getAllProduct')
    .then((res) => {
      products = res.data
    })
    .catch((error) => {
      console.error('Failed to fetch getAllProduct:', error)
    })
  return {
    props: {
      categorys: categorys,
      products: products,
    },
    //revalidate: 10, // In seconds (optional, for incremental static regeneration)
  }
}

export default Home
