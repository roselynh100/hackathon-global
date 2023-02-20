import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button, Code, Flex, Heading, Link, Spacer, Stack, Text, Tooltip } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { TSpeaker } from '../types/types'

interface EventAccordionProps {
  name?: string
  description?: string
  event_type: string
  start_time: number
  speakers?: TSpeaker
  public_url?: string
  private_url: string
}

const EventAccordion = ({ name, description, event_type, start_time, speakers, public_url, private_url }: EventAccordionProps) => {
  const normalTime = (time: number) => {
    return dayjs.unix(time/1000).format('ddd, DD MMM YYYY @ hh:mm A')
  }

  const timeUntil = (time: number) => { // TODO: alternate between hours and days depending on time elapsed?
    const eventDate = dayjs(dayjs.unix(time/1000))
    const currentDate = dayjs()
    const difference = eventDate.diff(currentDate, 'hour')
    if (difference > 0) {
      return (difference + ' hours until event')
    }
    return ((difference * -1) + ' hours since event')
  }

  return (
    <AccordionItem>
      <AccordionButton h={14}>
        <AccordionIcon mr={4} />
        <Flex width='100%'>
          <Heading size='md' mr={4}>{name}</Heading>
          <Code variant='subtle'>{event_type}</Code>
          <Spacer />
          <Tooltip label={timeUntil(start_time)}>
            <Text>{normalTime(start_time)}</Text>
          </Tooltip>
        </Flex>
      </AccordionButton>
      <AccordionPanel>
        <Stack ml={9}>
          {/* <Text>{speakers?.map(speaker) => speaker.name}</Text> */}
          <Text mb={3}>{description}</Text>
          <Button variant='link' w='fit-content'><Link href={public_url ?? private_url}>View Event</Link></Button>
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default EventAccordion