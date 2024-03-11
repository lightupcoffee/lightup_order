// components/Dialog.js
import React from 'react'

const Dialog = ({ isOpen, children, top, width }) => {
  if (!isOpen) return null

  return (
    <div>
      {/* <div className="fixed inset-0 z-50  flex  justify-center bg-orange-500 bg-opacity-30 pt-10">
        <div
          className={`absolute   max-w-xl rounded-lg bg-gray-900  ${width ? width : 'w-full'}`}
          style={{ top: top ? top : '33%', transform: 'translateY(-50%)' }}
        >
          {children}
        </div>
      </div> */}
      <div className="pointer-events-none fixed inset-0 bg-primary-500 transition-opacity"></div>
      <div className="pointer-events-auto fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            style={{ top: top ? top : '33%' }}
            className="fixed left-1/2 top-1/2  w-72 max-w-xl -translate-x-1/2 -translate-y-1/2 transform rounded-4xl bg-secondary px-4 py-6 text-center "
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dialog
