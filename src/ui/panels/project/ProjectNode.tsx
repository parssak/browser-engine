import React, { ReactElement } from 'react'

interface Props {
  title: string
  children?: ReactElement | ReactElement[] | any
}

export default function ProjectNode({title, children}: Props): ReactElement {
  return (
    <details>
      <summary>{title}</summary>
      {children ?? `No ${title}`}
    </details>
  )
}
