import { useState } from 'react'
import UserContext from './UserContext'

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const BaseUser = {
    username: null,
    loggedIn: false
  }
  const [user, setUser] = useState(BaseUser)
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider