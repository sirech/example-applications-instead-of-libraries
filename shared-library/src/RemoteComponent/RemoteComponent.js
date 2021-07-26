import React, { useMemo } from 'react'
import { remoteUrl as remoteUrlLoader } from './remoteUrl'
import { loadRemoteModuleSystem } from './loadRemoteModuleSystem'
import LazyModule from '../LazyModule'

const loadRemoteComponent = ({ component, environment }) => {
  const remoteUrl = remoteUrlLoader({
    environment:
      environment ?? process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV',
    origin: process.env.OBJECTS_ORIGIN,
  })

  return loadRemoteModuleSystem({
    remote: {
      url: remoteUrl,
      // needs to match with the name of the remote application
      name: 'remote',
    },
    component,
  })
}

const RemoteComponent = ({
  component,
  error,
  delayed,
  environment,
  ...props
}) => {
  const RemoteComponentLoader = useMemo(
    () => loadRemoteComponent({ component, environment }),
    [component, environment]
  )

  const RemoteObject = useMemo(
    () => React.lazy(RemoteComponentLoader),
    [RemoteComponentLoader]
  )

  return (
    <LazyModule error={error} delayed={delayed}>
      <RemoteObject {...props} />
    </LazyModule>
  )
}

export default RemoteComponent
