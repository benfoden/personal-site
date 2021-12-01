import { useCallback } from 'react'
import styles from './RecentPosts.module.scss'
import { PostProps } from '@/lib/types'
import Link from 'next/link'

const RecentPosts = ({ posts }: PostProps) => {
  const renderPosts = useCallback(() => {
    if (posts.length > 0) {
      return (
        <>
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
          <Link href="/posts">
            <a>
              <h2>Ver mais</h2>
            </a>
          </Link>
        </>
      )
    }
    return <p> Sem posts por enquanto :( </p>
  }, [posts])

  return (
    <div className={styles.container}>
      <h1>Posts recentes</h1>
      {renderPosts()}
    </div>
  )
}

export default RecentPosts
