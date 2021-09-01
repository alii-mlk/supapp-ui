import React from 'react';
import ScreenRouter from './src/router/ScreenRouter'
import CurrentUserContextProvider from './src/contexts/CurrentUserContext'

export default function App() {
  return (
    <CurrentUserContextProvider>
      <ScreenRouter />
    </CurrentUserContextProvider>
  )
}
