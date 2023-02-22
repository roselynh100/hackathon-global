import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/public-sans/400.css'
import '@fontsource/public-sans/600.css'
import '@fontsource/public-sans/800.css'

import theme from './styles/theme'
import UserProvider from './contexts/UserProvider'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <UserProvider>
        <App />
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
)