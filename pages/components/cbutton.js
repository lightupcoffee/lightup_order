// components/FooterBanner.js
import React from 'react'

const cButton = ({ text, click, disable, mode }) => {
  const handleclick = () => {
    if (!disable && click) {
      click()
    }
  }
  return (
    <div
      className={` ${mode === 'dark' ? 'bg-secondary text-primary focus:bg-primary focus:text-secondary' : 'bg-primary text-secondary focus:bg-secondary focus:text-primary'} rounded-full py-2 text-center font-bold  `}
      onClick={handleclick}
    >
      {text}
    </div>
  )
}

export default cButton
