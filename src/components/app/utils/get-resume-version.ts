import { ResumeVersions } from "../../../types/resume-versions";

export const getResumeVersion = (): ResumeVersions | undefined => {
  const PARAM_NAME = 'version'
    const value = new URL(document.location.href).searchParams.get(PARAM_NAME)
    if (!value) {
      return undefined
    }
    const isValidVersion = Object.values(ResumeVersions).some((version) => version === value)
    if (!isValidVersion) {
      console.error('Invalid resume version.')
      return undefined
    }
    return value as ResumeVersions
}
