export const formatDate = (date: Date | number | string): string => {
  const d: Date = new Date(date);
  if (Number.isNaN(d.getTime())) {
    return ''
  }
  return d.toLocaleString()
}
