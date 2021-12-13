import Image from 'next/image'
import Container from '@/components/Container'
import type { PropsWithChildren } from 'react'
import type { Snippet } from '.contentlayer/types'
import styles from './styles.module.scss'

export default function LayoutSnippet({ children, snippet }: PropsWithChildren<{ snippet: Snippet }>) {
  return (
    <Container
      title={`${snippet.title} | Douglas Henrique`}
      description={snippet.description}
      image={``}
      date={snippet.publishedAt}
      type="article"
    >
      <article className={styles.article}>
        <h1> {snippet.title} </h1>
        <p> {snippet.description} </p>
        <div className={styles.post}>{children}</div>
      </article>
    </Container>
  )
}
