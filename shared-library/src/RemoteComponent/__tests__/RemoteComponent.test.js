import React from 'react'
import RemoteComponent from '../RemoteComponent'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../..'

const mockRemoteComponentsUrl = jest.fn()

jest.mock('../loadRemoteModuleSystem', () => ({
  __esModule: true,
  loadRemoteModuleSystem: jest.fn(({ component }) => () => {
    return component === 'Broken'
      ? import('../__fixtures__/BrokenComponent.fixture')
      : import('../__fixtures__/TestComponent.fixture')
  }),
}))

jest.mock('../remoteUrl', () => ({
  __esModule: true,
  remoteUrl: jest.fn((...args) => {
    mockRemoteComponentsUrl(...args)
    return 'http://local.test/remoteEntry.js'
  }),
}))

const renderComponent = (children) =>
  render(<LanguageProvider value="de-DE">{children}</LanguageProvider>)

describe('RemoteComponent', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterAll(() => {
    const consoleError = console.error
    consoleError.mockRestore()
    process.env = OLD_ENV
  })

  it('configures based on the relevant process.env properties', async () => {
    process.env.NODE_ENV = 'production'
    process.env.OBJECTS_ORIGIN = 'https://test'

    renderComponent(<RemoteComponent component="Test" />)

    expect(await screen.findByText('ready')).toBeInTheDocument()

    expect(mockRemoteComponentsUrl).toHaveBeenCalledWith({
      environment: 'PROD',
      origin: 'https://test',
    })
  })

  it('uses the environment prop (with precedence over NODE_ENV)', async () => {
    process.env.NODE_ENV = 'development'

    renderComponent(<RemoteComponent component="Test" environment="PROD" />)

    expect(await screen.findByText('ready')).toBeInTheDocument()

    expect(mockRemoteComponentsUrl).toHaveBeenCalledWith(
      expect.objectContaining({
        environment: 'PROD',
      })
    )
  })

  it('uses the loading state element', async () => {
    renderComponent(
      <RemoteComponent
        component="Test"
        delayed={<p>Loading test component</p>}
      />
    )

    expect(screen.getByText('Loading test component')).toBeInTheDocument()
  })

  it('displays the fallback component when provided', async () => {
    const consoleError = console.error

    render(<RemoteComponent component="Broken" error={<p>error</p>} />)

    expect(await screen.findByText('error')).toBeInTheDocument()
    expect(consoleError.mock.calls[0][0]).toContain(
      'Error: Uncaught [Error: oh dear]'
    )
  })

  it('if the error fallback is provided as a function, the error is passed in', async () => {
    const consoleError = console.error

    renderComponent(
      <RemoteComponent
        component="Broken"
        error={({ error }) => <p>{error.toString()}</p>}
      />
    )

    expect(await screen.findByText('Error: oh dear')).toBeInTheDocument()
    expect(consoleError.mock.calls[0][0]).toContain(
      'Error: Uncaught [Error: oh dear]'
    )
  })
})
