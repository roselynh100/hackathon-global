import { useState, useEffect } from 'react'
import { Accordion, Button, Container, Heading, Text } from '@chakra-ui/react'

import LoginModal from './components/LoginModal'
import EventAccordion from './components/EventAccordion'
import { TEvent, TPermission } from './types/types'

function App() {

  const [events, setEvents] = useState<TEvent[]>([])
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    // loads events from api
    const loadEvents = async () => {
      const response = await fetch('https://api.hackthenorth.com/v3/events')
      // orders events by start time
      setEvents((await response.json()).sort((a: TEvent, b: TEvent) => a.start_time - b.start_time))
    }
    loadEvents()
  }, [])

  return (
    <Container maxW='5xl'>
      <LoginModal header='Hackathon Global' subheader='The place for all your Hackathon needs!' />
      <Heading size='3xl' textAlign='center' mt={36}>Hack the North</Heading>
      <Heading size='xl' textAlign='center' my={10}>— January 15-17, 2021 —</Heading>
      <Text fontSize='xl' mb={10}>What's going on?</Text>
      <Accordion allowMultiple>
        {events?.map((event: TEvent, i) => (
          loggedIn ?
            <EventAccordion key={i} name={event.name} description={event.description} event_type={event.event_type} start_time={event.start_time} private_url={event.private_url} />
            : event.permission === TPermission.PUBLIC && <EventAccordion key={i} name={event.name} description={event.description} event_type={event.event_type} start_time={event.start_time} public_url={event.public_url} private_url={event.private_url} />
        ))}
      </Accordion>
      <Button onClick={() => setLoggedIn(!loggedIn)}>change views</Button>
    </Container>
  )
}

export default App