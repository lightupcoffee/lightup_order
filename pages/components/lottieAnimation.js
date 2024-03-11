import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

const LottieAnimation = ({ animationData }) => {
  const animationContainer = useRef(null)

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current, // 容器元素
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData, // 動畫數據
    })

    return () => anim.destroy() // 組件卸載時銷毀動畫
  }, [animationData])

  return <div ref={animationContainer} />
}

export default LottieAnimation
