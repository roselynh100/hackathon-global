import { extendTheme, Input } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: `'Public Sans', sans-serif`,
    body: `'Public Sans', sans-serif`
  },
  shadows: { outline: '0 0 0 3px var(--chakra-colors-teal-500)' },
})

Input.defaultProps = { ...Input.defaultProps, focusBorderColor: 'teal.500' }


export default theme