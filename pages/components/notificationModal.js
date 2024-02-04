// components/NotificationModal.js
import React from 'react'
import CButton from './cbutton'

const NotificationModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-20 h-full w-full overflow-y-auto bg-[#e2791c]/50 bg-opacity-50 px-5" id="my-modal">
      <div className="relative top-60 mx-auto  rounded-xl  bg-secondary px-4 py-6 shadow-lg">
        <p className="text-center text-2xl font-bold">用餐須知</p>
        <ul className="my-4 w-full list-disc  px-8 pr-1 leading-8">
          <li>入店低消一杯飲品 (不含餐食和甜點)</li>
          <li>為顧孩童安危，不接待 12 歲以下兒童。</li>
          <li>禁止嬉鬧玩耍， 談話請注意音量，請勿影響其他客人。</li>
          <li>如損壞店內物品，餐具類一律賠償500 元新台幣，其他另計。</li>
          <li>禁止外食，垃圾請自行帶離。</li>
          <li>人數到齊才入座，請勿擅自換桌。</li>
          <li>客滿時限90分鐘，禁止商業攝影。</li>
          <li>不提供打包服務。</li>
        </ul>
        <div className="px-12 ">
          <CButton text={'我知道了，我願意遵守'} click={onClose}></CButton>
        </div>
      </div>
    </div>
  )
}

export default NotificationModal
