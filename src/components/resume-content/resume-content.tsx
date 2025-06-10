import React, { useMemo } from 'react'
import { Icon } from '../markup/icon/icon'
import s from './resume-content.module.scss'
import { getResumeVersion } from './get-resume-version'

type Props = {
  version?: string | undefined,
}

export const ResumeContent: React.FC<Props> = ({version}) => {
  if (!version) {
    return (
      <>
        <i>The resume is hidden.</i><br/>
        <br/>
        <Icon name="chat" /> <a href="https://t.me/tushinski">Hit me up in Telegram!</a>
      </>
    )
  }
  const Content = useMemo(() => {
    return getResumeVersion(version)
  }, [version])

  if (!Content) {
    return null
  }
  
  return (
    <div className={s.content}>
      <Content/>
    </div>
  )
}
