import { useState } from 'react'
import { Button, Flex, Heading, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spacer, Text, useDisclosure } from '@chakra-ui/react'

import LoginForm from './LoginForm'

interface ModalProps {
  header: string
  subheader?: string
}

const LoginModal = ({ header, subheader }: ModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex>
        <Spacer />
        <Button onClick={onOpen}>Log In</Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size='md' isCentered>
        <ModalOverlay />
        <ModalContent py={5} px={2}>
          <ModalCloseButton />
          <ModalHeader mt={5}>
            <Heading fontSize='3xl' textAlign='center' color='teal'>{header}</Heading>
            <Text fontSize='md' textAlign='center' mt={2} mb={5}>{subheader}</Text>
          </ModalHeader>
          <LoginForm onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginModal