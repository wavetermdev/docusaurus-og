import React from 'react'
import clsx from 'clsx'
import Link from '@docusaurus/Link'
import { useBlogPost } from '@docusaurus/theme-common/internal'
import styles from './styles.module.css'
import { Typography } from '@acid-info/lsd-react'

export default function BlogPostItemHeaderTitle({ className }) {
  const { metadata, isBlogPostPage } = useBlogPost()
  //@ts-ignore
  const { permalink, title, frontMatter } = metadata
  const TitleHeading = isBlogPostPage ? 'h1' : 'h2'

  return (
    <>
      <TitleHeading
        className={clsx(styles.title, className)}
        itemProp="headline"
      >
        {isBlogPostPage ? (
          title
        ) : (
          <Link itemProp="url" to={permalink}>
            {title}
          </Link>
        )}
      </TitleHeading>
      {frontMatter?.description && (
        <Typography variant="h6" className={styles.description}>
          {frontMatter.description}
        </Typography>
      )}
    </>
  )
}
