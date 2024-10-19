export function parseTime (s: number) {
  const minutes = Math.floor(s / 60)
  const seconds = Math.floor(s - minutes * 60)

  return `${minutes < 10 ? '0' + minutes : minutes }:${ seconds < 10 ? '0' + seconds : seconds }`
}

export function differencesBetweenDate (date: string) {
  return Math.floor((Date.parse(date) - Date.now()) / 1000)
}
