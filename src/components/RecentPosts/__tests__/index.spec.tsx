import { render, screen } from '@testing-library/react'
import RecentPosts from '../'

describe('<RecentPosts />', () => {
  it('should render the heading', () => {
    const { container } = render(<RecentPosts />)

    expect(screen.getByRole('heading', { name: /RecentPosts/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
