import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns'

export const formatDate = (date, pattern = 'dd MMM yyyy') => {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date
    return isValid(d) ? format(d, pattern) : '—'
  } catch { return '—' }
}

export const formatDateTime = (date) =>
  formatDate(date, 'dd MMM yyyy, hh:mm a')

export const timeAgo = (date) => {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date
    return isValid(d) ? formatDistanceToNow(d, { addSuffix: true }) : '—'
  } catch { return '—' }
}

export const formatMonthYear = (date) =>
  formatDate(date, 'MMM yyyy')