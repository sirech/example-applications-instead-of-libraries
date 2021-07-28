import React from 'react'
import { Card, CardHeader, CardContent } from '@material-ui/core'
import Welcome from './Welcome'

const WelcomeFrame = () => {
  return (
    <Card variant="outlined">
      <CardHeader title="WelcomeFrame (remotely imported)"></CardHeader>
      <CardContent>
        <Welcome />
      </CardContent>
    </Card>
  )
}

export default WelcomeFrame
