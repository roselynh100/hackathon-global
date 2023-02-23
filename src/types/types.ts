// Each event will belong to one of the following types
export enum TEventType {
  WORKSHOP = 'workshop',
  ACTIVITY = 'activity',
  TECH_TALK = 'tech_talk'
}
// type TEventType = 'workshop' | 'activity' | 'tech_talk'
// type TPermission = 'public' | 'private'
export enum TPermission {
  PUBLIC = 'public',
  PRIVATE = 'private'
}

export type TSpeaker = {
  name: string
}

// The information for an event will look like so
export type TEvent = {
  id: number
  name: string
  event_type: TEventType
  permission?: TPermission

  start_time: number // unix timestamp (ms)
  end_time: number // unix timestamp (ms)

  description?: string // a paragraph describing the event
  speakers: TSpeaker[] // a list of speakers for the event

  public_url?: string // a url to display for the general public
  private_url: string // a url to display for hackers
  related_events: number[] // a list ids corresponding to related events
}

// What the endpoints will return
export type TEndpointResponse = TEvent | TEvent[]

// User interface
export interface User {
  username: string | null
  loggedIn: boolean
  setUser: React.Dispatch<React.SetStateAction<{
    username: null;
    loggedIn: boolean;
  }>>
}