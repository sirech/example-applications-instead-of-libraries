/**
 * Load a remote module system using webpack globals
 *
 * This entire file exists due the fact we need to determine the url for the remoteEntry manifest at runtime.
 * This is due to the fact we are reading the locale from the user's cookie.
 *
 * The hope is that this file becomes obsolete as webpack support for this kind of thing evolves.
 * This ultimately removes the need for specifying any `remotes` config in the webpack.config.js file.
 *
 * The functions here are largely taken from the module-federation examples:
 * https://github.com/module-federation/module-federation-examples/tree/master/dynamic-system-host
 */

import { loadScript } from './loadScript'

const loadAndInitiateWebpackContainer = async (remote) => {
  const { name, url } = remote

  // load the remote
  await loadScript(url)

  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  await __webpack_init_sharing__('default')

  const container = window[name]

  if (typeof container?.init !== 'function') {
    throw new Error(`Cannot load external remote: ${name} from url: ${url}`)
  }

  // Initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default)

  return container
}

export const loadRemoteModuleSystem = ({ remote, component }) => {
  const { name, url } = remote

  return async () => {
    const container = await loadAndInitiateWebpackContainer({ url, name })

    if (typeof container.get !== 'function') {
      throw new Error(`Cannot load external remote: ${name} from url: ${url}`)
    }

    const loadedComponent = component.match(/^\.\//)
      ? component
      : `./${component}`

    const factory = await container.get(loadedComponent)

    if (typeof factory !== 'function') {
      throw new Error(
        `Cannot load ${component} in remote: ${name} from url ${url}`
      )
    }
    const Module = factory()

    return Module
  }
}
