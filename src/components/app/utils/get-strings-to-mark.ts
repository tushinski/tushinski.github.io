
export const getStringsToMark = (): string[] => {
  const PARAM_NAME = 'mark'
  const SEPARATOR = '|'
  const value = new URL(document.location.href).searchParams.get(PARAM_NAME)
  return value
    ? value.split(SEPARATOR).map(str => str.trim())
    : []
}
