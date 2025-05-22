import React from 'react'
import s from './resume.module.scss'
import { SaveButton } from '../save-button/save-button'
import { ResumeContent } from '../resume-content/resume-content'
import type { ResumeVersions } from '../../types/resume-versions'
import { If } from '../utility-components/if/if'

type Props = {
  version?: ResumeVersions | undefined,
}

export const Resume: React.FC<Props> = (props) => {
  const handleSaveClick = () => {
    print()
  }
  return (
    <div className={s.container}>
      <div className={s.header}>
        <If condition={!!props.version}>
            <SaveButton onClick={handleSaveClick}/>
        </If>
      </div>
      <div className={s.resume}>
        <div className={s.resumeSheet}>
          <div className={s.resumeContent}>
            <ResumeContent version={props.version}/>
          </div>
        </div>
      </div>
    </div>
  )
}
