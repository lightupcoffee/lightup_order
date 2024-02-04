// components/FooterBanner.js
import React from 'react'

const cButton = ({ text, click, disable }) => {
  const handleclick = () => {
    if (!disable) {
      click()
    }
  }
  return (
    <div
      className="rounded-full  bg-primary py-2 text-center font-bold text-secondary focus:bg-secondary focus:text-primary"
      onClick={handleclick}
    >
      {text}
    </div>
  )
}

export default cButton
