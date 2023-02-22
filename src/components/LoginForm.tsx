import { useState, useContext } from 'react'
import { Button, FormControl, FormErrorMessage, Input, InputGroup, InputRightElement, ModalBody, ModalFooter, Stack } from '@chakra-ui/react'

import UserContext from '../contexts/UserContext'

const LoginForm = () => {
  const { user, setUser } = useContext(UserContext)

  const [show, setShow] = useState<boolean>(false)
  const handleClick = () => setShow(!show)

  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState<{ username: string, password: string }>({ username: '', password: '' })
  const [isError, setIsError] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError(false)
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)

    if (formData.username.toString().toLowerCase() !== 'frontend' || formData.password !== 'hackthenorth') {
      setTimeout(() => setIsError(true), 1000)
      console.log('Bad! Throwing error!')
      return
    }
    setTimeout(() => setUser({ username: formData.username, loggedIn: true }), 1000)
    console.log('Logging in!')
    }

  return (
    <>
      <ModalBody>
        <FormControl isInvalid={isError}>
          <Stack spacing={5}>
            <Input name='username' placeholder='Username' size='md' onChange={handleChange} />
            <InputGroup>
              <Input name='password' placeholder='Password' type={show ? 'text' : 'password'} onChange={handleChange} />
              <InputRightElement width='4.5rem'>
                <Button variant='ghost' size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            {isError && <FormErrorMessage>Invalid credentials. Please try again.</FormErrorMessage>}
          </Stack>
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSubmit} isLoading={loading} colorScheme='teal'>
          Log In
        </Button>
      </ModalFooter>
    </>
  )
}

export default LoginForm