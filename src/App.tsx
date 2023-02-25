import { useState, useEffect, useContext } from 'react'
import { Accordion, Box, Button, Container, Flex, Heading, HStack, Image, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Spacer, Text, Tooltip, useDisclosure, useMediaQuery, useToast } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import './styles/App.css'
import TModal from './components/TModal'
import LoginForm from './components/LoginForm'
import UserMenu from './components/UserMenu'
import EventAccordionItem from './components/EventAccordionItem'
import TypingHeader from './components/TypingHeader'
import { TEvent, TEventType, TPermission } from './types/types'
import UserContext from './contexts/UserContext'
import blob from './assets/blob.svg'
import blob2 from './assets/blob2.svg'

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
    // returns event type in a proper case string - used in filtering options
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
      <Container maxW='5xl' minH='40vw' mb={20}>
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
              <MenuOptionGroup type='radio' defaultValue='showAll'>
                <MenuItemOption value='showAll' onClick={() => setFilter(null)}>Show All</MenuItemOption>
                {Object.values(TEventType).sort().map((event: TEventType) => (
                  <MenuItemOption value={event} onClick={() => setFilter(event)}>{parseEventType(event)}</MenuItemOption>
                ))}
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
          {user.loggedIn && <Button size='md' onClick={() =>
            toast({
              title: 'Schedule created!',
              description: 'Your download should be starting shortly.',
              status: 'success',
              variant: 'subtle',
              isClosable: true
            })
          }>Generate schedule</Button>}
        </Flex>
        <Accordion allowMultiple backgroundColor='rgba(355, 355, 355, 0.2)'>
          {events?.filter((event: TEvent) => {
            return search.toLowerCase() === '' ? event : event.name.toLowerCase().includes(search)
          }).filter((event: TEvent) => filter ? event.event_type === filter : event)
          .map((event: TEvent) => (
            user.loggedIn ?
              <EventAccordionItem key={event.id} index={event.id}
              name={event.name}
              description={event.description}
              event_type={event.event_type}
              start_time={event.start_time}
              private_url={event.private_url}
              related_events={
                event.related_events?.map((e: number) => events.find((x: TEvent) => x.id === e) as TEvent)
              } />
            : event.permission === TPermission.PUBLIC &&
              <EventAccordionItem key={event.id} index={event.id}
              name={event.name}
              description={event.description}
              event_type={event.event_type}
              start_time={event.start_time}
              public_url={event.public_url}
              private_url={event.private_url}
              related_events={
                event.related_events?.filter(
                  (eventId: number) => events.find((x: TEvent) => x.id === eventId && x.permission === TPermission.PUBLIC)
                ).map((eventId: number) => events.find((x: TEvent) => x.id === eventId) as TEvent)
              } />
          ))}
        </Accordion>
      </Container>
      <Image 
        src={blob}
        position='absolute'
        bottom={user.loggedIn ? 38 : -200}
        left={-10}
        w='40%'
        opacity={0.4}
        zIndex={-2}
      />
      <Image 
        src={blob2}
        position='absolute'
        bottom={user.loggedIn ? '19%' : '-120'}
        right='-200'
        w='60%'
        opacity={0.4}
        zIndex={-2}
      />
    </>
  )
}

export default App