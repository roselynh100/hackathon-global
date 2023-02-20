import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Flex, Heading, Spacer, Text } from '@chakra-ui/react'

interface EventAccordionProps {
  title?: string
  description?: string
  activity?: string
  date?: string
}

const EventAccordion = ({ title, description, activity, date }: EventAccordionProps) => {
  return (
    <AccordionItem>
      <AccordionButton>
        <AccordionIcon mr={4} />
        <Flex width='100%'>
          <Heading size='md' mr={4}>{ title }</Heading>
          <Text>{ activity }</Text>
          <Spacer />
          <Text>{ date }</Text>
        </Flex>
      </AccordionButton>
      <AccordionPanel>
        { description }
      </AccordionPanel>
    </AccordionItem>
  )
}

export default EventAccordion