import ReactTypingEffect from 'react-typing-effect'
import { Heading } from '@chakra-ui/react'

const TypingHeader = ({ text }: { text: string }) => {
  return (
    <Heading size='3xl' textAlign='center' color='white' textShadow='2px 2px 20px #272727' mt={36}>
      <ReactTypingEffect text={text}/>
    </Heading>
  )
}

export default TypingHeader