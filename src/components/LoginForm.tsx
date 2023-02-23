import { useState, useContext } from 'react'
import { Button, FormControl, FormErrorMessage, Input, InputGroup, InputRightElement, ModalBody, ModalFooter, Stack } from '@chakra-ui/react'
import { motion, useAnimationControls } from 'framer-motion'

import UserContext from '../contexts/UserContext'

interface LoginFormProps {
  onClose: () => void
}

const LoginForm = ({ onClose }: LoginFormProps) => {
  const { setUser } = useContext(UserContext)

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
      setTimeout(() => {
        setIsError(true)
        controls.start('start')
      }, 1000)
      return
    }
    setTimeout(() => onClose(), 1000)
    setTimeout(() => setUser({ username: formData.username.toLowerCase(), loggedIn: true }), 1100)
  }

  const variants = {
    start: () => ({
      x: [1, 6, -3, 0],
      transition: {
        duration: 0.2
      }
    })
  }

  const controls = useAnimationControls()

  return (
    <>
      <ModalBody>
        <FormControl isInvalid={isError}>
          <motion.div
            variants={variants}
            animate={controls}
          >
            <Stack spacing={5}>
              <Input name='username' id='username' placeholder='Username' size='md' onChange={handleChange} />
              <InputGroup>
                <Input name='password' id='password' placeholder='Password' type={show ? 'text' : 'password'} onChange={handleChange} />
                <InputRightElement width='4.5rem'>
                  <Button variant='ghost' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isError && <FormErrorMessage>Invalid credentials. Please try again.</FormErrorMessage>}
            </Stack>
          </motion.div>
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