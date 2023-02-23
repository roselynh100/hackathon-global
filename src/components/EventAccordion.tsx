import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Button, Checkbox, Code, Flex, Heading, Link, Spacer, Stack, Text, Tooltip, useAccordionItemState } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { TEvent } from '../types/types'

interface EventAccordionProps {
  id: number
  name?: string
  description?: string
  event_type: string
  start_time: number
  public_url?: string
  private_url: string
  related_events: TEvent[] | undefined
}

const EventAccordion = ({ id, name, description, event_type, start_time, public_url, private_url, related_events }: EventAccordionProps) => {

  const CloseAccordion = ({ children, relatedId }: { children: React.ReactNode, relatedId: number }) => {
    const { onClose } = useAccordionItemState()
    return <Button variant='link' onClick={() => {
      onClose()
      doSomething(relatedId.toString())
    }}>{children}</Button>
  }

  const doSomething = (relatedId: string) => {
    console.log(relatedId)
    console.log(document.querySelector('#el' + relatedId), 'is the element')
    const element = document.querySelector('#el' + relatedId)
    element?.dispatchEvent(new CustomEvent('click'))

    console.log(document.getElementById('el' + relatedId))
    document.getElementById('el' + relatedId)?.click()
  }

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
      <h2>
        <div id={'el' + id.toString()}>
          <AccordionButton className={id.toString()} _expanded={{ color: 'teal' }} h={14}>
            <AccordionIcon mr={4} />
            <Flex width='100%'>
              <Heading size='md' mr={4}>{name}</Heading>
              <Code variant='subtle'>{event_type}</Code>
              <Spacer />
              <Tooltip label={timeUntil(start_time)}>
                <Text mr={4}>{normalTime(start_time)}</Text>
              </Tooltip>
              <Checkbox size='lg' colorScheme='teal' />
            </Flex>
          </AccordionButton>
        </div>
      </h2>
      <AccordionPanel>
        <Stack ml={9} gap={3}>
          <Text>{description}</Text>
          <Button variant='link' w='fit-content' colorScheme='teal'><Link href={public_url ?? private_url}>View Event</Link></Button>
          {related_events?.length !== 0 && <Box>
            <Text fontWeight={600} mb={2}>Related events</Text>
            <Stack direction='row' gap={5}>
              {related_events?.map((e: TEvent) => 
                <CloseAccordion relatedId={e.id}><Link>{e.name}</Link></CloseAccordion>
              )}
            </Stack>
          </Box>}
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  )
}

export default EventAccordion