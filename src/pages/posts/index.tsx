import { useCallback } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Posts.module.scss'
import { allPosts } from '.contentlayer/data'
import { useRouter } from 'next/router'
import Container from '@/components/Container'

type Post = {
  title: string
  publishedAt: string
  author: string
  readingTime: string
  slug: string
  subtitle: string
  avatar: string
}

interface PostProps {
  posts: Post[]
}

const Blog: NextPage<PostProps> = ({ posts }) => {
  const renderPosts = useCallback(() => {
    if (posts.length > 0) {
      return (
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.slug}>
                <Link href={`posts/${post.slug}`}>
                  <a>
                    <small>{post.readingTime}</small>
                    <h2> {post.title} </h2>
                    <p>{post.subtitle}</p>
                    <div className={styles.infoWrapper}>
                      {!!post.avatar && <Image src={post.avatar} alt={`Foto de ${post.author}`} height="30" width="30" />}
                      <label>{post.author}</label>
                      <label>{post.publishedAt} </label>
                    </div>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      )
    }
    return <p> Sem posts por enquanto :( </p>
  }, [posts])

  return (
    <div className={styles.container}>
      <Container
        title="Posts | Douglas Henrique"
        description="Douglas Henrique | Tech manager, desenvolvedor e criador de conteúdo."
      >
        <h1>Posts </h1>
        {renderPosts()}
      </Container>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts.map((post) => {
    return {
      title: post.title,
      publishedAt: post.publishedAt,
      author: post.author,
      readingTime: post.readingTime.text,
      slug: post.slug,
      subtitle: post.subtitle,
      avatar: post.avatar,
    }
  })

  return { props: { posts } }
}

export default Blog
