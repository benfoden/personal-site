import { useCallback } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import styles from '@/styles/Posts.module.scss'
import { allSnippets } from '.contentlayer/data'
import Container from '@/components/Container'

type Snippet = {
  title: string
  slug: string
  subtitle: string
  publishedAt: string
  category: string
}

interface PostProps {
  snippets: Snippet[]
}

const Snippets: NextPage<PostProps> = ({ snippets }) => {
  const renderSnippets = useCallback(() => {
    if (snippets.length > 0) {
      return (
        <ul>
          {snippets.map((snippet) => {
            return (
              <li key={snippet.slug}>
                <Link href={`snippets/${snippet.slug}`}>
                  <a>
                    <h2> {snippet.title} </h2>
                    <p>{snippet.subtitle}</p>
                    <small>{snippet.category}</small>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      )
    }
    return <p> Sem snippets por enquanto :( </p>
  }, [snippets])

  return (
    <div className={styles.container}>
      <Container
        title="Snippets | Douglas Henrique"
        description="Douglas Henrique | Tech manager, desenvolvedor e criador de conteúdo."
      >
        <h1>Posts </h1>
        {renderSnippets()}
      </Container>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const snippets = allSnippets.map((snippet) => {
    return {
      title: snippet.title,
      publishedAt: snippet.publishedAt,
      description: snippet.description,
      slug: snippet.slug,
      subtitle: snippet.subtitle,
    }
  })

  return { props: { snippets } }
}

export default Snippets
