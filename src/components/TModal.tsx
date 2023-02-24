import { Heading, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'

interface ModalProps {
  header?: string
  subheader?: string
  children?: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

const TModal = ({ header, subheader, children, isOpen, onClose }: ModalProps) => {
  return (
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
  )
}

export default TModal