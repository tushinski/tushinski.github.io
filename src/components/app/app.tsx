import { useEffect, useMemo, useRef } from "react"
import { Resume } from "../resume/resume"
import 'material-symbols'
import { getResumeVersionParam } from "./utils/get-resume-version-param"
import { getStringsToMark } from "./utils/get-strings-to-mark"
import mark from 'mark.js'

export const App = () => {
  const resumeVersion = useMemo(getResumeVersionParam, [])
  const stringsToMark = useMemo(getStringsToMark, [])
  const appContainerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const m = new mark(appContainerRef.current as HTMLElement)
    m.mark(stringsToMark, {
      separateWordSearch: false,
      accuracy: 'exactly'
    })
  }, [])
  return (
    <div ref={appContainerRef}>
      <Resume version={resumeVersion} />
    </div>
  )
}
