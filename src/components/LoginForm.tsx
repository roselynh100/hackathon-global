import { useState } from 'react'
import { Button, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react'

const LoginForm = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <Stack spacing={5}>
      <Input placeholder='Username' size='md' />
      <InputGroup>
        <Input placeholder='Password' type={show ? 'text' : 'password'} />
        <InputRightElement width='4.5rem'>
          <Button variant='ghost' size='sm' onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    </Stack>
  )
}

export default LoginForm