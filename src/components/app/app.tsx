import { useMemo } from "react"
import { Resume } from "../resume/resume"
import 'material-symbols'
import { getResumeVersion } from "./utils/get-resume-version"

export const App = () => {
  const resumeVersion = useMemo(getResumeVersion, [])
  return (
    <Resume version={resumeVersion} />
  )
}
