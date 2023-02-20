import { Accordion } from '@chakra-ui/react'

import LoginModal from './components/LoginModal'
import EventAccordion from './components/EventAccordion'

function App() {
  return (
    <>
      <Accordion allowMultiple>
        <EventAccordion title={'Title Here'} description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porttitor malesuada nisl, sit amet dapibus nibh imperdiet dapibus. Praesent lacinia, nisl quis ornare molestie, est felis cursus nisl, nec efficitur libero diam et tellus. Donec quis libero interdum lacus placerat aliquam id et tellus. Vestibulum luctus eleifend velit, sit amet dapibus nunc posuere ut. Ut turpis lorem, viverra vitae est finibus, fermentum sodales urna. Morbi posuere tortor id eros consequat, sed semper nisi dapibus. Morbi bibendum est mi, pellentesque molestie justo faucibus faucibus. Mauris commodo, quam vitae rutrum laoreet, mi tellus aliquam velit, at finibus mi ex vel dui. Etiam vitae convallis sapien. Curabitur dictum, lectus ac finibus rhoncus, tellus ligula lacinia libero, ac egestas risus velit vitae erat. Fusce commodo leo ornare hendrerit pellentesque.'} activity={'workshop'} date={'date'} />
        <EventAccordion />
      </Accordion>
      <LoginModal />
    </>
  )
}

export default App