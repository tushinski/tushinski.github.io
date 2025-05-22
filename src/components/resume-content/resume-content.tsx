import React, { useMemo } from 'react'
import { Icon } from '../markup/icon/icon'
import s from './resume-content.module.scss'
import { ResumeVersions } from '../../types/resume-versions'
import { ResumeDevVersion } from './versions/resume-dev-version'
import { ResumeFullVersion } from './versions/resume-full-version'
import { ResumeTLVersion } from './versions/resume-tl-version'
import { ResumePMVersion } from './versions/resume-pm-version'

type Props = {
  version?: ResumeVersions | undefined,
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
    switch (version) {
      case ResumeVersions.Full:
        return ResumeFullVersion
      case ResumeVersions.Frontend:
        return ResumeDevVersion
      case ResumeVersions.TL:
        return ResumeTLVersion
      case ResumeVersions.PM:
        return ResumePMVersion
    }
  }, [version])
  
  return (
    <div className={s.content}>
      <Content/>
    </div>
  )
}
