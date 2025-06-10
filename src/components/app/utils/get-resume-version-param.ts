
export const getResumeVersionParam = (): string | undefined => {
  const PARAM_NAME = 'version'
  return new URL(document.location.href).searchParams.get(PARAM_NAME) || undefined
}
