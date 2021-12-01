import styles from './About.module.scss'
import Image from 'next/image'

const About = () => (
  <div className={styles.container}>
    <div>
      <h1>Douglas Henrique</h1>
      <p>Tech Lead at Provi</p>

      <label>8 anos contruindo lindas aplicações para o mundo web e mobile ✨ </label>
    </div>
    <div>
      <Image src="https://avatars.githubusercontent.com/u/9868584?v=4" height="150" width="150" />
    </div>
  </div>
)

export default About
