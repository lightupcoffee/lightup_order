// pages/index.js
import React, { useState, useEffect } from 'react'
import axios from '../utils/axiosInstance'
import Image from 'next/image'
import Category from './order/category'
import Product from './order/product'
function Home() {
  const [showproduct, setshowproduct] = useState(false)
  const [categoryid, setcategoryid] = useState(1)
  const selectCategory = (id) => {
    setcategoryid(id)
    setshowproduct(true)
  }
  const productBack = () => {
    setshowproduct(false)
  }
  return (
    <div className="container mx-auto px-5 ">
      <div className="flex justify-between pb-4 pt-9">
        <div>
          <Image
            src="/images/hamburger.svg" // 圖片的路徑
            alt="hamburger" // 圖片描述
            width={36} // 圖片的寬度
            height={36} // 圖片的高度
            layout="responsive" // 圖片的佈局方式
          />
        </div>
        <div>
          <Image
            src="/images/car.svg" // 圖片的路徑
            alt="購物車" // 圖片描述
            width={36} // 圖片的寬度
            height={36} // 圖片的高度
            layout="responsive" // 圖片的佈局方式
          />
        </div>
      </div>
      <div className="mx-auto max-w-2xl">
        <Image
          src="/images/logo_title.svg" // 圖片的路徑
          alt="star icon" // 圖片描述
          width={335} // 圖片的寬度
          height={100} // 圖片的高度
          layout="responsive" // 圖片的佈局方式
        />
      </div>
      <div className="mx-auto max-w-2xl  sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {!showproduct && <Category onSelect={selectCategory}></Category>}
        {showproduct && <Product categoryid={categoryid} onBack={productBack}></Product>}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  let categorys = []

  await axios
    .get('/category/getAllCategory')
    .then((res) => {
      categorys = res.data
    })
    .catch((error) => {
      console.error('Failed to fetch data:', error)
    })

  return {
    props: {
      categorys: categorys,
    },
    revalidate: 10, // In seconds (optional, for incremental static regeneration)
  }
}

export default Home
