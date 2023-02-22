import { useState } from 'react'
import UserContext from './UserContext'

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({ username: '', loggedIn: false })
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider