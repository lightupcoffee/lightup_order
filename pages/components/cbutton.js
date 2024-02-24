import React from 'react'

const cButton = ({ text, click, disable, mode, size }) => {
  const handleclick = () => {
    // 當按鈕被禁用時不執行任何操作
    if (disable || !click) return

    click()
  }

  const baseClasses = 'border-1 h2 w-full cursor-pointer text-nowrap rounded-full border border-current text-center'
  // 移除了active相關的樣式，將它們放在非禁用狀態的判斷中
  const modeClasses =
    mode === 'secondary'
      ? `bg-secondary text-primary ${!disable && 'active:bg-primary active:text-secondary'}`
      : `bg-primary text-secondary ${!disable && 'active:bg-secondary active:text-primary'}`
  const sizeClasses = size === 'sm' ? 'px-6 py-3' : 'px-8 py-4'
  // 更新禁用時的樣式，移除了active相關的樣式
  const disabledClasses = disable ? '  cursor-not-allowed opacity-50' : ''

  return (
    <div className={`${baseClasses} ${modeClasses} ${sizeClasses} ${disabledClasses}`} onClick={handleclick}>
      {text}
    </div>
  )
}

export default cButton
