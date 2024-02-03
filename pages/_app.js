// pages/_app.js
import FooterBanner from './components/footerbanner.js'
import '../styles/globals.css' // 調整路徑以符合你的檔案結構

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <FooterBanner />
    </>
  )
}

export default MyApp
