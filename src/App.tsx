import { useState, useEffect } from 'react'
import { Accordion, Container, Heading, Text } from '@chakra-ui/react'

import LoginModal from './components/LoginModal'
import EventAccordion from './components/EventAccordion'
import { TEvent, TPermission } from './types/types'

function App() {

  const [events, setEvents] = useState([])
  const userLoggedIn = false

  useEffect(() => {
    const loadEvents = async () => {
      const response = await fetch('https://api.hackthenorth.com/v3/events')
      setEvents((await response.json()).sort((a: TEvent, b: TEvent) => a.start_time - b.start_time))
    }
    loadEvents()
  }, [])

  return (
    <Container maxW='5xl'>
      <LoginModal />
      <Heading size='3xl' textAlign='center' mt={36}>Hack the North</Heading>
      <Heading size='xl' textAlign='center' my={10}>— January 15-17, 2021 —</Heading>
      <Text fontSize='xl' mb={10}>What's going on?</Text>
      <Accordion allowMultiple>
        {events?.map((event: TEvent, i) => (
          userLoggedIn ?
            <EventAccordion key={i} name={event.name} description={event.description} event_type={event.event_type} start_time={event.start_time} private_url={event.private_url} />
            : event.permission === TPermission.PUBLIC && <EventAccordion key={i} name={event.name} description={event.description} event_type={event.event_type} start_time={event.start_time} public_url={event.public_url} private_url={event.private_url} />
        ))}
      </Accordion>
    </Container>
  )
}

export default App