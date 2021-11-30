export type Post = {
  title: string
  publishedAt: string
  author: string
  readingTime: string
  slug: string
  subtitle: string
  avatar: string
}

export interface PostProps {
  posts: Post[]
}
