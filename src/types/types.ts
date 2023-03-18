export interface Event {
  bookmarkID: any
  id?: string
  name: string
  image: string
  dates: Dates
  category: Category
  location: Location
  venue: Venue
  address: string
  participants: number
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

export interface LoggedUser {
  uid: string;
  email: string;
}
