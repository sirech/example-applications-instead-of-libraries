import { useLanguage } from '@applications-instead-of-libraries/shared-library'
import React from 'react'
import { useContext } from './WelcomeFrame'

const Welcome = () => {
  const context = useContext()
  const name = useLanguage()

  return (
    <>
      <p>
        <b>Internal state</b> is <i>{context}</i>
      </p>
      <p>
        The selected locale is <i>{name}</i>
      </p>
    </>
  )
}

export default Welcome
