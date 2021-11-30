import styles from './RecentPosts.module.scss'
import { PostProps } from '@/lib/types'
import Link from 'next/link'

const RecentPosts = ({ posts }: PostProps) => (
  <div className={styles.container}>
    <h1>Recent Posts</h1>
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`posts/${post.slug}`}>
            <a>
              <h2>{post.title} </h2>
              <p>{post.subtitle}</p>
              <small>{post.readingTime}</small>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default RecentPosts
