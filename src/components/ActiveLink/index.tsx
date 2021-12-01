import Link, { LinkProps } from 'next/link'
import { ReactElement, cloneElement } from 'react'
import { useRouter } from 'next/router'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement
  activeClassName?: string
  shouldMatchExactHref?: boolean
}

function ActiveLink({ children, shouldMatchExactHref = false, activeClassName, ...rest }: ActiveLinkProps) {
  let isActive = false

  const { asPath } = useRouter()

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true
  }

  if (!shouldMatchExactHref && (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))) {
    isActive = true
  }

  const className = isActive ? activeClassName : ''

  return <Link {...rest}>{cloneElement(children, { className })}</Link>
}

export default ActiveLink
