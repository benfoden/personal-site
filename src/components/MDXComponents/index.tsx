import Image from 'next/image'
import { ReactElement } from 'react'
import styles from './styles.module.scss'

type FlexCenterProps = {
  children: ReactElement;
}

const FlexCenter = ({ children }: FlexCenterProps) => {
  return <div className={styles.flexCenter}>
    {children}
  </div>
}

const MDXComponents = {
  Image,
  FlexCenter
}

export default MDXComponents