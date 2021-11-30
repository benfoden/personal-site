import styles from './styles.module.scss'

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <label>© {new Date().getFullYear()} Douglas Henrique. All Rights Reserved.</label>
    </footer>
  )
}

export default Footer
