import { Typography } from '@acid-info/lsd-react'
import isInternalUrl from '@docusaurus/isInternalUrl'
import Link from '@docusaurus/Link'
import { isRegexpStringMatch } from '@docusaurus/theme-common'
import useBaseUrl from '@docusaurus/useBaseUrl'
import React from 'react'
import { IconExternalLink } from '../../../components/Icon/Icon'
import styles from './styles.module.css'

export default function NavbarNavLink({
  activeBasePath,
  activeBaseRegex,
  to,
  href,
  label,
  html,
  isDropdownLink,
  prependBaseUrlToHref,
  ...props
}) {
  // TODO all this seems hacky
  // {to: 'version'} should probably be forbidden, in favor of {to: '/version'}
  const toUrl = useBaseUrl(to)
  const activeBaseUrl = useBaseUrl(activeBasePath)
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true })
  const isExternalLink = label && href && !isInternalUrl(href)

  // Link content is set through html XOR label
  const linkContentProps = html
    ? { dangerouslySetInnerHTML: { __html: html } }
    : {
        children: (
          <Typography
            component="div"
            variant="body2"
            className={styles.linkContent}
          >
            {label}
            {isExternalLink && (
              <IconExternalLink className={styles.externalLinkIcon} />
            )}
          </Typography>
        ),
      }

  if (href) {
    return (
      <Link
        href={prependBaseUrlToHref ? normalizedHref : href}
        {...props}
        {...linkContentProps}
      />
    )
  }

  return (
    <Link
      to={toUrl}
      isNavLink
      {...((activeBasePath || activeBaseRegex) && {
        isActive: (_match, location) =>
          activeBaseRegex
            ? isRegexpStringMatch(activeBaseRegex, location.pathname)
            : location.pathname.startsWith(activeBaseUrl),
      })}
      {...props}
      {...linkContentProps}
    />
  )
}
