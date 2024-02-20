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
import OrderSuccessModal from './components/orderSuccessModal'
function Home({ categorys, products }) {
  const router = useRouter()
  const { tableid } = router.query
  const [showNotificationModal, setshowNotificationModal] = useState(false)
  const [showproduct, setshowproduct] = useState(false)
  const [productlist, setproductlist] = useState([])
  const [selectedcategory, setselectedcategory] = useState(1)
  const [car, setcar] = useState({})
  const [carImageState, setcarImageState] = useState('empty')
  const [showShoppingCar, setshowShoppingCar] = useState(false)
  const [showConfirmModal, setshowConfirmModal] = useState(false)
  const [showOrderSuccessModal, setshowOrderSuccessModal] = useState(false)
  const selectCategory = (target) => {
    setselectedcategory(target)
    setproductlist(products.filter((x) => x.categoryid === target.categoryid))
    setshowproduct(true)
  }
  const productBack = () => {
    setshowproduct(false)
  }

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited')
    console.log('hasVisited', hasVisited)
    if (!hasVisited) {
      setshowNotificationModal(true)
      sessionStorage.setItem('hasVisited', 'true')
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
    setshowConfirmModal(false)
    setshowOrderSuccessModal(true)

    await axios({
      method: 'post',
      url: '/order/createOrder',
      //API要求的資料
      data: {
        car: car,
        tableid: tableid,
      },
    })
      .then((res) => {
        console.log('success')
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error)
      })

    setTimeout(() => {
      orderSuccessModalClose()
    }, 3000)
  }
  const orderSuccessModalClose = () => {
    removeCarItem(-1)
    setshowShoppingCar(false)
    setshowOrderSuccessModal(false)
    setshowproduct(false)
  }
  return (
    <div className="flex h-svh ">
      {showNotificationModal && <NotificationModal onClose={handleClose} />}
      <div
        onClick={(e) => {
          if (showShoppingCar) {
            e.stopPropagation() // 阻止事件冒泡
            setshowShoppingCar(false)
          }
        }}
        className={`relative flex h-svh w-full flex-row  transition-transform duration-300 ${showShoppingCar ? '-translate-x-[18rem] xl:-translate-x-0' : ''}`}
      >
        <div className={`container mx-auto flex h-svh flex-1 transform flex-col px-5  lg:max-w-7xl `}>
          <div className="flex justify-between pb-4 pt-9">
            <div className="cursor-pointer">
              <Image
                src="/images/hamburger.svg" // 圖片的路徑
                alt="hamburger" // 圖片描述
                width={36} // 圖片的寬度
                height={36} // 圖片的高度
                layout="responsive" // 圖片的佈局方式
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
                layout="responsive" // 圖片的佈局方式
              />
            </div>
          </div>
          <div className="mx-auto max-w-2xl ">
            <Image
              src="/images/logo_title.svg" // 圖片的路徑
              alt="star icon" // 圖片描述
              width={335} // 圖片的寬度
              height={100} // 圖片的高度
              layout="responsive" // 圖片的佈局方式
            />
          </div>
          <div className="w-full max-w-2xl flex-1 overflow-auto sm:px-6 lg:max-w-7xl lg:px-8">
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
          <div className="c1  w-full shrink-0  bg-secondary py-4">
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
        onClose={() => {
          setshowShoppingCar(false)
        }}
        removeCarItem={removeCarItem}
        checkout={() => {
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
        ></ConfirmModal>
      )}
      {showOrderSuccessModal && <OrderSuccessModal></OrderSuccessModal>}
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
