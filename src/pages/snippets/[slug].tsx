import { useMDXComponent } from 'next-contentlayer/hooks'
import Components from '@/components/MDXComponents'
import { allSnippets } from '.contentlayer/data'
import type { Snippet } from '.contentlayer/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import LayoutSnippet from '../../layouts/Snippet'

export default function Post({ snippet }: { snippet: Snippet }) {
  const Component = useMDXComponent(snippet.body.code)
  return (
    <LayoutSnippet snippet={snippet}>
      <Component
        components={
          {
            ...Components,
          } as any
        }
      />
    </LayoutSnippet>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: allSnippets.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const snippet = allSnippets.find((snippet) => snippet.slug === params?.slug)
  return { props: { snippet } }
}
