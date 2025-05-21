import React from 'react'
import s from './icon.module.scss'
import classNames from 'classnames'

type Props = {
  name: string,
}

export const Icon: React.FC<Props> = (props) => {
  const iconClassName = classNames(
    'material-symbols-sharp',
    s.icon,
  )
  return (
    <span className={iconClassName}>
      {props.name}
    </span>
  )
}
