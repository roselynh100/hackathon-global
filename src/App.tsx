import { useState, useEffect, useContext } from 'react'
import { Accordion, Box, Button, Container, Heading, HStack, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react'

import './styles/App.css'
import LoginModal from './components/LoginModal'
import UserMenu from './components/UserMenu'
import EventAccordion from './components/EventAccordion'
import { TEvent, TPermission } from './types/types'
import UserContext from './contexts/UserContext'

function App() {

  const {user, setUser} = useContext(UserContext)

  const [search, setSearch] = useState<string>('')
  const [events, setEvents] = useState<TEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<TEvent[]>([])

  useEffect(() => {
    // loads events from api
    const loadEvents = async () => {
      const response = await fetch('https://api.hackthenorth.com/v3/events')
      // orders events by start time
      setEvents((await response.json()).sort((a: TEvent, b: TEvent) => a.start_time - b.start_time))
      setFilteredEvents(events)
    }
    loadEvents()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    console.log(search, 'is search')
    setFilteredEvents(events.filter((ev) => (ev.name.includes(search) || ev.event_type.toString().includes(search) || ev.start_time.toString().includes(search))))
    console.log('filtering events', filteredEvents)
  }

  return (
    <>
      <Container maxW='100%' bg='#509594'>
        <Container maxW='5xl' pt={10}>
          {user.loggedIn ?
            <UserMenu /> :
            <LoginModal header='Hackathon Global' subheader='The place for all your Hackathon needs!' />
          }
          <Heading size='3xl' textAlign='center' mt={36} color='white'>Hack the North</Heading>
          <Heading size='xl' textAlign='center' mt={10} color='white'>— January 15-17, 2021 —</Heading>
        </Container>
      </Container>
      <Box className='spacer layer1'/>
      <Container maxW='5xl'>
        <Text fontSize='xl' mb={7}>What's going on?</Text>
        <HStack mb={5}>
          <InputGroup w='40%'>
            <InputLeftElement
              pointerEvents='none'
              children={<i className='ri-search-line' />}
            />
            <Input placeholder='Search by name, activity type, or date' value={search} onChange={handleChange} />
          </InputGroup>
          <Button size='md'>Generate schedule</Button>
        </HStack>
        <Accordion allowMultiple mb={10}>
          {filteredEvents?.map((event: TEvent, i) => (
            user.loggedIn ?
              <EventAccordion key={i} name={event.name} description={event.description} event_type={event.event_type} start_time={event.start_time} private_url={event.private_url} />
              : event.permission === TPermission.PUBLIC && <EventAccordion key={i} name={event.name} description={event.description} event_type={event.event_type} start_time={event.start_time} public_url={event.public_url} private_url={event.private_url} />
          ))}
        </Accordion>
      </Container>
    </>
  )
}

export default App