import { createContext } from 'react'

const UserContext = createContext({
  user: {
    username: '',
    loggedIn: false
  },
  setUser: (user: {
    username: string,
    loggedIn: boolean
  }) => {}
})

export default UserContext