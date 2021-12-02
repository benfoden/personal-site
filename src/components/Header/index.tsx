import styles from './Header.module.scss'
import ActiveLink from '../ActiveLink'
import { RiGithubFill } from 'react-icons/ri'
import Link from 'next/link'

const Header = () => (
  <div className={styles.container}>
    <Link href="/">
      <a>
        <h2>doug.dev</h2>
      </a>
    </Link>
    <nav>
      <ActiveLink activeClassName={styles.active} shouldMatchExactHref href="/" passHref>
        <a>Home</a>
      </ActiveLink>
      <ActiveLink activeClassName={styles.active} href="/posts" passHref>
        <a>Posts</a>
      </ActiveLink>
      <ActiveLink href="https://github.com/douglas-henrique/personal-site">
        <a target="_blank" rel="noreferrer">
          <RiGithubFill className={styles.gitIcon} /> <label>GitHub</label>
        </a>
      </ActiveLink>
    </nav>
  </div>
)

export default Header
