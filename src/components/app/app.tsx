import { useMemo } from "react"
import { Resume } from "../resume/resume"
import 'material-symbols'
import { getResumeVersionParam } from "./utils/get-resume-version-param"

export const App = () => {
  const resumeVersion = useMemo(getResumeVersionParam, [])
  return (
    <Resume version={resumeVersion} />
  )
}
