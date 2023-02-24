import { useState, useContext } from 'react'
import { Button, Flex, HStack, Menu, MenuButton, MenuList, MenuItem, ModalFooter, Spacer, Text } from '@chakra-ui/react'
import UserContext from '../contexts/UserContext'
import TModal from './TModal'

interface UserMenuProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const UserMenu = ({ isOpen, onOpen, onClose }: UserMenuProps) => {
  const { user, setUser } = useContext(UserContext)

  const [loading, setLoading] = useState<boolean>(false)

  const handleClose = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
    setTimeout(() => onClose(), 1000)
    setTimeout(() => setUser({ username: '', loggedIn: false }), 1200)
  }

  return (
    <>
      <Flex>
        <Spacer />
        <Menu>
          <MenuButton as={Button}>
            <HStack>
              <i className='ri-account-circle-fill ri-lg'></i>
              <Text>{user.username}</Text>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>Log out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <TModal header='Continue logging out?' subheader='You will no longer see the full list of events.' isOpen={isOpen} onClose={onClose}>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>Cancel</Button>
          <Button colorScheme='teal' onClick={handleClose} isLoading={loading}>Log Out</Button>
        </ModalFooter>
      </TModal>
    </>
  )
}

export default UserMenu