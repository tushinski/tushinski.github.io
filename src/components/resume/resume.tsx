import React from 'react'
import s from './resume.module.scss'
import { SaveButton } from '../save-button/save-button'
// import { ResumeContent } from '../resume-content/resume-content'

type Props = {}

export const Resume: React.FC<Props> = () => {
  const handleSaveClick = () => {
    print()
  }
  return (
    <div className={s.container}>
      <div className={s.header}>
        <SaveButton onClick={handleSaveClick}/>
      </div>
      <div className={s.resume}>
        <div className={s.resumeSheet}>
          <div className={s.resumeContent}>
            Work in progress...
            {/* <ResumeContent/> */}
          </div>
        </div>
      </div>
    </div>
  )
}
