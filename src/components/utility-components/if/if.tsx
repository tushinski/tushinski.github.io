import React, { type PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  condition: boolean
}>

export const If: React.FC<Props> = (props) => {
  if (!props.condition) {
    return null
  }
  return (
    props.children
  )
}
