import { Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'

import LoginForm from './LoginForm'

const LoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Log In</Button>
      <Modal isOpen={isOpen} onClose={onClose} size='md'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader mt={5}>
            <Heading fontSize='3xl' textAlign='center'>Hackathon Global</Heading>
          </ModalHeader>
          <ModalBody>
            <LoginForm />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>
              Log In
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginModal