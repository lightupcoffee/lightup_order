// components/NotificationModal.js
import React from 'react'
import CButton from './cbutton'

const NotificationModal = ({ onClose }) => {
  return (
    <div className="font-ch fixed inset-0 z-20 h-svh w-full  bg-primary-500  " id="my-modal">
      {/* <div className="relative top-52 mx-auto  rounded-xl bg-secondary  px-4 py-6 shadow-lg sm:w-80 md:w-96"> */}
      <div className="fixed left-1/2 top-1/2 w-[22rem] -translate-x-1/2 -translate-y-1/2 transform rounded-4xl bg-secondary px-1 py-6  font-light md:w-96 ">
        <p className="h1 text-center">用餐須知</p>
        <ul className=" paragraph w-full  list-disc  py-4 pl-10 ">
          <li>入店低消一杯飲品 (不含餐食和甜點)</li>
          <li>為顧孩童安危，不接待 12 歲以下兒童。</li>
          <li>
            禁止嬉鬧玩耍， 談話請注意音量，<br></br>請勿影響其他客人。
          </li>
          <li>
            如損壞店內物品，餐具類一律賠償500<br></br>元新台幣，其他另計。
          </li>
          <li>玻璃杯本身杯壁較薄，使用時請加以小心。</li>
          <li>禁止外食，垃圾請自行帶離。</li>
          <li>人數到齊才入座，請勿擅自換桌。</li>
          <li>客滿時限90分鐘，禁止商業攝影。</li>
          <li>不提供打包服務。</li>
          <li>同組客人請以一人代表點餐即可。</li>
        </ul>
        <div className="px-12 ">
          <CButton text={'我知道了，我願意遵守'} mode={'primary'} size={'sm'} click={onClose}></CButton>
        </div>
      </div>
    </div>
  )
}

export default NotificationModal
