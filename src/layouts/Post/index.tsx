import Image from 'next/image'
import Container from '@/components/Container'
import type { PropsWithChildren } from 'react'
import type { Post } from '.contentlayer/types'
import styles from './styles.module.scss'

export default function LayoutPost({ children, post }: PropsWithChildren<{ post: Post }>) {
  return (
    <Container
      title={`${post.title} | ${post.author}`}
      description={post.summary}
      image={post.banner ? `https://www.dougdev.com.br/images/${post.banner}` : ``}
      date={post.publishedAt}
      type="article"
    >
      <article className={styles.article}>
        <small>{post.readingTime.text}</small>
        <h1> {post.title} </h1>
        <div className={styles.informations}>
          {!!post.avatar && <Image src={post.avatar} alt={`Foto de ${post.author}`} height="30" width="30" />}
          <label>{`${post.author} - ${post.publishedAt}`}</label>
        </div>
        <div className={styles.post}>{children}</div>
      </article>
    </Container>
  )
}
