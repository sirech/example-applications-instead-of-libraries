import { useLanguage } from '@applications-instead-of-libraries/shared-library'
import React from 'react'

const Welcome = () => {
  const name = useLanguage()

  return (
    <p>
      The selected locale is <i>{name}</i>
    </p>
  )
}

export default Welcome
