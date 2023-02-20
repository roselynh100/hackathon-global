import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Flex, Heading, Spacer, Text, Tooltip } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { TEvent } from '../types/types'

interface EventAccordionProps {
  name?: string
  description?: string
  event_type: string
  start_time: number
}

const EventAccordion = ({ name, description, event_type, start_time }: EventAccordionProps) => {
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
      <AccordionButton>
        <AccordionIcon mr={4} />
        <Flex width='100%'>
          <Heading size='md' mr={4}>{ name }</Heading>
          <Text>{ event_type }</Text>
          <Spacer />
          <Tooltip label={timeUntil(start_time)}>
            <Text>{ normalTime(start_time) }</Text>
          </Tooltip>
        </Flex>
      </AccordionButton>
      <AccordionPanel>
        { description }
      </AccordionPanel>
    </AccordionItem>
  )
}

export default EventAccordion