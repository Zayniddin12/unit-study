import 'intl-messageformat'

import { useI18n } from 'vue-i18n'
import type { LocationQuery } from 'vue-router'

export function formatNumberSpace(number?: number, fix = 0) {
  return new Intl.NumberFormat('uz-UZ', {
    minimumFractionDigits: fix,
  })
    .format(number)
    .replace(/,/g, ' ')
}

export function formatCardDeadline(cardDeadline: string) {
  // Split the input (e.g., "07/27") by '/'
  const [month, day] = cardDeadline.split('/')

  // Return the formatted string in "DDMM" format
  return `${day}${month}`
}

export function formatComma(number: number, fix = 0) {
  return Intl.NumberFormat('uz-UZ', {
    minimumFractionDigits: fix,
  })
    .format(number)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const richTextPurify = (str?: string, count = 10_000) => {
  const text = str?.replace(/<\/?[^>]+(>|$)|&[^\s]*;/gi, '')
  if (count === 0) {
    return text
  }
  return text?.substring(0, count)
}

export function phoneNumberFormatter(number: string) {
  if (number) {
    const format = number
      ?.replace(/\D/g, '')
      .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/)
    return `+${format && format[1] ? format[1] : ''} ${
      format && format[2] ? format[2] : ''
    } ${format && format[3] ? format[3] : ''} ${
      format && format[4] ? format[4] : ''
    } ${format && format[5] ? format[5] : ''}`
  }
}

const timeouts: Record<string, any> = {}

const cTimeout = (key = 'key') => {
  if (timeouts[key]) {
    clearTimeout(timeouts[key])
    timeouts[key] = undefined
  }
}
export const debounce = (key = 'key', fn = () => {}, timeout = 500) => {
  const sTimeout = (key: string, fn: any, timeout: number) => {
    cTimeout(key)

    timeouts[key] = setTimeout(() => {
      try {
        fn()
      } catch (e) {}

      timeouts[key] = undefined
    }, timeout)
  }

  return sTimeout(key, fn, timeout)
}

export function calculateValueInRange(
  min: number,
  max: number,
  percent: number
) {
  // Ensure that percent is between 0 and 100
  percent = Math.min(100, Math.max(0, percent))

  // Calculate the range
  const range = max - min

  // Calculate the value based on the percentage
  return min + range * (percent / 100)
}

export function calculatePercentInRange(
  min: number,
  max: number,
  value: number
) {
  // Ensure that value is between min and max
  value = Math.min(max, Math.max(min, value))

  // Calculate the range
  const range = max - min

  // Calculate the percentage based on the value
  return ((value - min) / range) * 100
}

export function convertToEmbed(url: string) {
  // Match the video ID from the URL using a regular expression
  const regex =
    /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtu\.be\/|(?:youtube(?:-nocookie)?\.com\/(?:.*(?:\/|v=))|(?:youtube.googleapis.com\/v\/)))([^&?\s]{11})/i
  let match
  if (url?.length) {
    match = url.match(regex)
  }
  // @ts-ignore
  if (match?.length) {
    return match[1]
  }
}

export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
// Date.now().toString(36) + Math.random().toString(36).substr(2)
export const errorHandler = (error: {
  _data: {
    error: {
      field: string
      message: string
    }
  }[]
}) => {
  if (error?._data?.length) {
    return error?._data[0]?.error?.message
  } else {
    return null
  }
}

export const formatRichText = (text: string) => {
  return text?.replaceAll('sandbox="" ', '')
}

export function formatCardNumber(cardNumber: string, mask?: boolean): string {
  if (mask) {
    const start = cardNumber.slice(0, 6)
    const end = cardNumber.slice(-4)
    return `${start}** **** ${end}`.replace(/\d{4}(?=.)/g, '$& ')
  }
  return cardNumber.replace(/\d{4}(?=.)/g, '$& ')
}

export const checkExpireDate = (value: any) => {
  const month = value.slice(0, 2)
  const year = value.slice(3, 5)

  const currentMonth = new Date().getMonth() + 1
  const currentYear = String(new Date().getFullYear()).slice(2, 5)
  const checkMonth =
    +month <= 12 &&
    (+year !== +currentYear ||
      (+year === +currentYear && +month >= currentMonth))
  const checkYear = year >= currentYear && year <= +currentYear + 5

  return checkYear && checkMonth
}

export function nFormatter(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k +' },
    { value: 1e6, symbol: 'M +' },
    { value: 1e9, symbol: 'G +' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /.0+$|(.[0-9]*[1-9])0+$/
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0'
}

export const share = (network: string, title: string) => {
  if (process.client) {
    switch (network) {
      case 'telegram':
        window.open(
          `https://t.me/share/url?url=${window.location.href}&text=${title}`,
          '_blank'
        )
        break
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${title}\n+${window.location.href}`,
          '_blank'
        )
        break
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?t=${title}\n${window.location.href}`,
          '_blank'
        )
        break
    }
  }
}

export function convertBytes(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  let unitIndex = 0
  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024
    unitIndex++
  }

  const unit = units[unitIndex]
  return bytes?.toFixed(2) + ' ' + unit
}

export function useGetFilteredParams(query: LocationQuery) {
  const { t } = useI18n()

  const defaults: Record<string, object | string | number | boolean> = {
    additional: '',
    countries: { id: '%', name: t('all_country') },
    city: { id: '%', name: t('all_city') },
    direction: { id: '%', name: t('all_directions') },
    level: { id: '%', name: t('all_degrees') },
    language: { id: '%', name: t('all_languages') },
    item: { id: '%', name: t('subject_taught') },
    checkbox: false,
    duration: { id: '%', name: '' },
    prices: { id: '%', name: '' },
    form_of_study: { id: '%', name: '' },
    free_training_opportunity: '',
    where_does_the_training_take_place: '',
    minValue: 0,
    maxValue: 160_000,
    minDuration: 0,
    maxDuration: 72,
    formType: { id: '%', name: t('all_forms') },
    studyPeriod: [],
    price__valid: false,
  }

  return Object.keys(query).reduce((acc, key) => {
    if (JSON.stringify(query[key]) !== JSON.stringify(defaults[key])) {
      acc[key] = query[key]
    }
    return acc
  }, {})
}

export const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.readAsDataURL(file)
    reader.onerror = (error) => reject(error)
  })
}
