// components/FooterBanner.js
import React from 'react'

const cButton = ({ text, click, disable, mode, size }) => {
  const handleclick = () => {
    if (!disable && click) {
      click()
    }
  }
  return (
    <div
      className={` ${mode === 'secondary' ? 'bg-secondary text-primary active:bg-primary active:text-secondary' : 'bg-primary text-secondary  active:bg-secondary active:text-primary'}
       ${size === 'sm' ? 'px-6 py-3' : 'px-8 py-4'} 
      border-1 w-full cursor-pointer text-nowrap rounded-full border  border-current  text-center font-bold `}
      onClick={handleclick}
    >
      {text}
    </div>
  )
}

export default cButton
