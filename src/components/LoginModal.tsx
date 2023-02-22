import { useState } from 'react'
import { Button, Heading, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'

import LoginForm from './LoginForm'

interface ModalProps {
  header: string
  subheader?: string
}

const LoginModal = ({ header, subheader }: ModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [setClose, toggleSetClose] = useState<boolean>(false)

  if (setClose) {
    onClose()
  }

  return (
    <>
      <Button onClick={onOpen}>Log In</Button>
      <Modal isOpen={isOpen} onClose={onClose} size='md'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader mt={5}>
            <Heading fontSize='3xl' textAlign='center'>{header}</Heading>
            <Text fontSize='md' textAlign='center' mt={2}>{subheader}</Text>
          </ModalHeader>
          <LoginForm setClose={setClose} toggleSetClose={toggleSetClose} />
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginModal