import { useState, useEffect, useContext } from 'react'
import { Accordion, Box, Button, Container, Flex, Heading, HStack, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Spacer, Text, Tooltip, useDisclosure, useMediaQuery, useToast } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import './styles/App.css'
import TModal from './components/TModal'
import LoginForm from './components/LoginForm'
import UserMenu from './components/UserMenu'
import EventAccordion from './components/EventAccordion'
import TypingHeader from './components/TypingHeader'
import { TEvent, TEventType, TPermission } from './types/types'
import UserContext from './contexts/UserContext'

function App() {

  const {user} = useContext(UserContext)

  const [filter, setFilter] = useState<TEventType | null>()
  const [search, setSearch] = useState<string>('')
  const [events, setEvents] = useState<TEvent[]>([])

  const toast = useToast()
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)') // TODO: check if larger than... 400? and change font sizes
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    // loads events from api
    const loadEvents = async () => {
      const response = await fetch('https://api.hackthenorth.com/v3/events')
      // by default, orders events by start time
      setEvents((await response.json()).sort((a: TEvent, b: TEvent) => a.start_time - b.start_time))
    }
    loadEvents()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const parseEventType = (eventType: TEventType) => {
    // returns event type in a proper case string
    return eventType.split('_').join(' ').replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase())
  }

  return (
    <>
      <Container maxW='100%' bg='#509594'>
        <Container maxW='5xl' pt={10} cursor='default'>
          {user.loggedIn ?
            <UserMenu isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> :
              <>
              <Flex>
                <Spacer />
                <Button onClick={onOpen}>Log In</Button>
              </Flex>
              <TModal header='Hackathon Global' subheader='The place for all your hackathon needs!' isOpen={isOpen} onClose={onClose}>
                <LoginForm onClose={onClose} />
              </TModal>
            </>
          }
          <TypingHeader text='Hack the North' />
          <motion.div whileHover={{ scale: 1.05 }}>
            <Heading size='xl' textAlign='center' mt={10} color='white'>January 15 - 17, 2021</Heading>
          </motion.div>
        </Container>
      </Container>
      <Box className='spacer layer1'/>
      <Container maxW='5xl' mb={28}>
        {user.loggedIn ? 
          <Text fontSize='2xl' fontWeight={600} mb={7} w='fit-content' cursor='default'>What's going on?</Text>
          : <Tooltip label='Log in to view more events!' placement='right'>
            <Text fontSize='2xl' fontWeight={600} mb={7} w='fit-content' cursor='default'>What's going on?</Text>
          </Tooltip>
        }
        <Flex mb={5}>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button}>
              <HStack>
              <i className='ri-filter-fill' />
              <Text>{isLargerThan800 ? 'Filter by event type' : 'Filter'}</Text>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup type='radio' defaultValue='none'>
                {Object.values(TEventType).sort().map((event: TEventType) => (
                  <MenuItemOption value={event} onClick={() => setFilter(event)}>{parseEventType(event)}</MenuItemOption>
                ))}
                <MenuItemOption value='none' onClick={() => setFilter(null)}>None</MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
          </Menu>
          <InputGroup w='40%' ml={5}>
            <InputLeftElement
              pointerEvents='none'
              children={<i className='ri-search-line' />}
            />
            <Input placeholder='Search for an event' value={search} onChange={handleChange} />
          </InputGroup>
          <Spacer />
          <Button size='md' onClick={() =>
            toast({
              title: 'Schedule created!',
              description: 'Your download should be starting shortly.',
              status: 'success',
              variant: 'subtle',
              isClosable: true
            })
          }>Generate schedule</Button>
        </Flex>
        <Accordion allowMultiple mb={10}>
          {events?.filter((event) => {
            return search.toLowerCase() === '' ? event : event.name.toLowerCase().includes(search)
          }).filter((event) => filter ? event.event_type === filter : event)
          .map((event: TEvent) => (
            user.loggedIn ?
              <EventAccordion key={event.id} id={event.id} name={event.name} description={event.description} event_type={event.event_type} start_time={event.start_time} private_url={event.private_url} related_events={event.related_events.map((e: number) => events[e-1])} />
              : event.permission === TPermission.PUBLIC &&
                <EventAccordion key={event.id} id={event.id} name={event.name} description={event.description} event_type={event.event_type} start_time={event.start_time} public_url={event.public_url} private_url={event.private_url} related_events={event.related_events?.filter((i: number) => events[i-1].permission === TPermission.PUBLIC).map((e: number) => events[e-1])} />
          ))}
        </Accordion>
      </Container>
    </>
  )
}

export default App