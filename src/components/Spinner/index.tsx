import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'
import styles from './Spinner.module.scss'

const Spinner = () => (
  <div className={styles.container}>
    <Loader type="ThreeDots" color="#fff" height={200} width={200} />
  </div>
)

export default Spinner
