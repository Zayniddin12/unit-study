import { useI18n } from 'vue-i18n'

export const useDateFormatter = (date: Date | string) => {
  if (typeof date !== 'string') {
    const localFormat = date.toLocaleDateString()
    return localFormat.replaceAll('/', '-').split('').reverse().join('')
  }
}

type EducationDuration = {
  year: string
  month: string
}

export function convertMonthsToYears(value: number) {
  const { t } = useI18n()
  const years = Math.floor(value / 12)
  const months = value % 12

  let result = ''
  if (years > 0) result += `${years} ${years > 1 ? t('years') : t('year')}`
  if (months > 0) {
    if (years > 0) result += ' '
    result += `${months} ${months > 1 ? t('months') : t('month')}`
  }

  return result || '0 months'
}

export const getYearsByMonthsCount = (value: number): EducationDuration => {
  const year = (value / 12).toFixed(0)
  const month = value % 12

  return {
    year,
    month: month ? String(month) : '',
  }
}

export function formatDate(input: string): string {
  try {
    // Parse the input date
    const match = input.match(
      /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}:\d{2}) GMT([+-]\d{2})/
    )
    if (!match) {
      throw new Error('Invalid input format')
    }

    const [_, day, month, year, time, offset] = match
    const isoString = `${year}-${month}-${day}T${time}:00${offset}:00` // ISO 8601 format
    const inputDate = new Date(isoString)

    if (isNaN(inputDate.getTime())) {
      throw new TypeError('Invalid date value')
    }

    // Format the parsed date
    const formatter = new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    })

    return formatter.format(inputDate)
  } catch (error) {
    console.error(error.message)
    return 'Invalid date'
  }
}

export function extractGMT(input: string | null | undefined): string | null {
  if (typeof input !== 'string') {
    console.warn('Invalid input provided to extractGMT:', input)
    return null // Return null if input is not a string
  }
  const match = input.match(/GMT[+-]\d{1,2}/)
  return match ? match[0] : null // Return the GMT offset or null if not found
}

export function formatDateToDDMMYYYY(dateString: string): string {
  const [year, month, day] = dateString.split('-')
  return `${day}.${month}.${year}`
}

export const getTodayDate = (format = 'YYYY-MM-DD') => {
  const today = new Date()

  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0') // Month (1-12), padded
  const day = String(today.getDate()).padStart(2, '0') // Day of the month, padded

  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`
    case 'DD-MM-YYYY':
      return `${day}-${month}-${year}`
    case 'locale':
      return today.toLocaleDateString() // Default locale
    default:
      throw new Error('Unsupported format')
  }
}
