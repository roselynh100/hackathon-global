import { useContext } from 'react'
import { Button, HStack, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react'
import UserContext from '../contexts/UserContext'

const UserMenu = () => {
  const { user, setUser } = useContext(UserContext)
  return (
    <Menu>
      <MenuButton as={Button}>
        <HStack>
          <i className='ri-account-circle-fill ri-lg'></i>
          <Text>{user.username}</Text>
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={() => setUser({ username: '', loggedIn: false })}>Log out</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserMenu