import { ResumeDevVersion } from './versions/resume-dev-version'
import { ResumeFullVersion } from './versions/resume-full-version'
import { ResumeTLVersion } from './versions/resume-tl-version'
import { ResumePMVersion } from './versions/resume-pm-version'

const resumeVersionToComponent: Record<string,React.FC> = {
  '8bcc82ae-ae5e-4028-8269-d29a95365764': ResumeDevVersion,
  'dd7e76dc-64dd-4feb-8045-1c7e58500187': ResumePMVersion,
  'd2cd96bf-ea28-4a9d-9e32-8163af7551af': ResumeTLVersion,
  '8b351fc7-9b8e-4a81-80da-c459d38ea575': ResumeFullVersion,
}

export const getResumeVersion = (key: string): React.FC => {
  return resumeVersionToComponent[key]
}
