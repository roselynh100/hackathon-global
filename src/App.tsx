import { useState, useEffect } from 'react'
import { Accordion, Container, Heading, Text } from '@chakra-ui/react'

import LoginModal from './components/LoginModal'
import EventAccordion from './components/EventAccordion'
import { TEvent } from './types/types'

function App() {

  const [events, setEvents] = useState([])

  useEffect(() => {
    const loadEvents = async () => {
      console.log('loading events')
      const response = await fetch('https://api.hackthenorth.com/v3/events')
      setEvents(await response.json())
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
          <EventAccordion key={i} name={event.name} description={event.description} event_type={event.event_type} start_time={event.start_time} />
        ))}
      </Accordion>
    </Container>
  )
}

export default App