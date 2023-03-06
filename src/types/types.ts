export interface Event {
  id?: string
  name: string
  images?: Image
  dates: Dates
  category: Category
  location: Location
  venue: Venue
  address: string
  participants: number
}

export interface Image {
  url: string
}

export interface Dates {
    date: string
    time: string
}

export interface Category {
    id: string
    name: string
}

export interface Venue {
  name: string
  id: string
  type: string
  address: {
    line1: string
  }
  location: Location
}

export interface Location {
  longitude: string
  latitude: string
}

export interface User {
  userName: string
  email: string
  UID: string
}

export interface Rating {
  user_id: string
  category?: string
  rate: number
  event_id: string
}

export interface Bookmark {
  user_id: string
  event_id: string
}
