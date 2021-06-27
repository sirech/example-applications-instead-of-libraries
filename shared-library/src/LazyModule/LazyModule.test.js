import React from 'react'
import { screen, render } from '@testing-library/react'

import LazyModule from './LazyModule'

describe('LazyModule', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    const consoleError = console.error
    consoleError.mockRestore()
  })

  describe('loading', () => {
    it('displays a delayed state while the content is loading', async () => {
      const Delayed = () => <p>loading</p>

      const Component = React.lazy(() =>
        import('./__fixtures__/TestComponent.fixture')
      )

      render(
        <LazyModule delayed={<Delayed />}>
          <Component />
        </LazyModule>
      )

      expect(screen.getByText('loading')).toBeInTheDocument()
      expect(await screen.findByText('ready')).toBeInTheDocument()
    })
  })

  describe('error boundary', () => {
    it('throws and displays an optional error fallback component', async () => {
      const consoleError = console.error
      const ErrorFallback = () => <p>error</p>

      const Component = React.lazy(() =>
        import('./__fixtures__/BrokenComponent.fixture')
      )

      render(
        <LazyModule error={<ErrorFallback />}>
          <Component />
        </LazyModule>
      )

      expect(await screen.findByText('error')).toBeInTheDocument()
      expect(consoleError.mock.calls[0][0]).toContain(
        'Error: Uncaught [Error: oh dear]'
      )
    })

    it('accepts a function component that will be called with error state', async () => {
      const consoleError = console.error
      const FallbackComponent = ({ error }) => <>{error.toString()}</>

      const Component = React.lazy(() =>
        import('./__fixtures__/BrokenComponent.fixture')
      )

      render(
        <LazyModule error={FallbackComponent}>
          <Component />
        </LazyModule>
      )

      expect(await screen.findByText('Error: oh dear')).toBeInTheDocument()
      expect(consoleError.mock.calls[0][0]).toContain(
        'Error: Uncaught [Error: oh dear]'
      )
    })

    it('logs errors', async () => {
      const consoleError = console.error
      const Component = React.lazy(() =>
        import('./__fixtures__/BrokenComponent.fixture')
      )

      render(
        <LazyModule error={<>stop</>}>
          <Component />
        </LazyModule>
      )

      expect(await screen.findByText('stop')).toBeInTheDocument()
      expect(consoleError.mock.calls[2]).toContain(
        'LazyModule failed while loading remote module'
      )
    })
  })
})
