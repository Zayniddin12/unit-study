export type Branch = {
  id: number
  name: string
  coordinates: [number, number]
}

export type ContactCard = {
  link: string
  icon: string
  title: string
  value: string | null
}

export type ContactItem = {
  card: ContactCard
  isHover: boolean
  targetBlank: boolean
}

export type ActiveCoord = {
  lat: number
  lng: number
  location: number
}
