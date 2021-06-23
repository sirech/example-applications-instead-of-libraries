import { NameContextProvider } from '@applications-instead-of-libraries/shared-library'
import React from 'react'

const Welcome = React.lazy(() => import('remote/Welcome'))

const App = () => (
  <div>
    <h1>Context Provider</h1>
    <h2>Host Application</h2>
    <NameContextProvider.Provider value="Billy">
      <React.Suspense fallback="Loading Name">
        <Welcome />
      </React.Suspense>
    </NameContextProvider.Provider>
  </div>
)

export default App
