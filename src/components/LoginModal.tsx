import { Button, Flex, Heading, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spacer, Text } from '@chakra-ui/react'

interface ModalProps {
  openButton: string
  header?: string
  subheader?: string
  children?: React.ReactNode
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const LoginModal = ({ openButton, header, subheader, children, isOpen, onOpen, onClose }: ModalProps) => {
  return (
    <>
      <Flex>
        <Spacer />
        <Button onClick={onOpen}>{openButton}</Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size='md' isCentered>
        <ModalOverlay />
        <ModalContent py={5} px={2}>
          <ModalCloseButton />
          <ModalHeader mt={5}>
            <Heading fontSize='3xl' textAlign='center' color='teal'>{header}</Heading>
            <Text fontSize='md' textAlign='center' mt={2} mb={5}>{subheader}</Text>
          </ModalHeader>
          {children}
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginModal