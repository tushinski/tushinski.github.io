import React from 'react'
import s from './save-button.module.scss'
import classNames from 'classnames'

type Props = {
  onClick: () => void,
}

export const SaveButton: React.FC<Props> = (props) => {
  const iconClassName = classNames(
    'material-symbols-sharp',
    s.icon,
  )
  return (
    <button className={s.button} onClick={props.onClick}>
      Save as PDF
      <span className={iconClassName}>download</span>
    </button>
  )
}
