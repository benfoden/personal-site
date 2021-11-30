import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Header from '@/components/Header'
import styles from '@/styles/Home.module.scss'
import Footer from '@/components/Footer'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container} >
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

export default MyApp
