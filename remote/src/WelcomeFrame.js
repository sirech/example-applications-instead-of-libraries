import React, { createContext } from 'react'
import { Card, CardHeader, CardContent } from '@material-ui/core'
import Welcome from './Welcome'

const Context = createContext('')
export const useContext = () => React.useContext(Context)

const WelcomeFrame = () => {
  return (
    <Context.Provider value="[private]">
      <Card variant="outlined">
        <CardHeader title="WelcomeFrame"></CardHeader>
        <CardContent>
          <Welcome />
        </CardContent>
      </Card>
    </Context.Provider>
  )
}

export default WelcomeFrame
