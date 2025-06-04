export interface Invitation {
  start: number // an integer between 0 and 540 (minutes since 8am)
  duration: number // an integer between 0 and 180 (minutes)
  appointee: string // the name of the person you're meeting
  id: string // these are unique among meeting objects, but otherwise opaque
}

export interface TimeSlot {
  start: number
  end: number
}
