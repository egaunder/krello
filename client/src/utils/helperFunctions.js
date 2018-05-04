export const empty = val => {
  if (typeof val === 'undefined' || val === null) {
    return true
  }
  return false
}
