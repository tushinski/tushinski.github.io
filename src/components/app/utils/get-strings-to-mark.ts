
export const getStringsToMark = (): string[] => {
  const PARAM_NAME = 'mark'
  const value = new URL(document.location.href).searchParams.get(PARAM_NAME)
  return value
    ? value.split(',').map(str => str.trim())
    : []
}
