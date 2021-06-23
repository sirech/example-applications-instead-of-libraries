import { NameContextProvider } from '@applications-instead-of-libraries/shared-library'
import React from 'react'
import Welcome from './Welcome'

const App = () => (
  <div>
    <NameContextProvider.Provider value="Susan">
      <h1>Context Provider</h1>
      <h2>App 2</h2>
      <Welcome />
    </NameContextProvider.Provider>
  </div>
)

export default App
