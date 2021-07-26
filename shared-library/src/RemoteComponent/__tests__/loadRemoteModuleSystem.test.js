import { loadRemoteModuleSystem } from '../loadRemoteModuleSystem'

const mockContainerInit = jest.fn((scope) => Promise.resolve(scope))
const mockContainerGet = jest.fn(
  (component) => () => Promise.resolve(component)
)

jest.mock('../loadScript', () => ({
  __esModule: true,
  loadScript: jest.fn((src) => {
    // add globals to the window to behave like the remoteEntry.js
    // e.g. window.testModules = { init: () => {}, get: () => () => {} }
    Object.defineProperties(global.window, {
      testModules: {
        value: {
          init: mockContainerInit,
          get: mockContainerGet,
        },
      },
    })

    return Promise.resolve(src)
  }),
}))

describe('loadRemoteModuleSystem', () => {
  const webpackInitSharing = jest.fn()

  beforeEach(() => {
    Object.defineProperties(global.window, {
      __webpack_init_sharing__: {
        value: webpackInitSharing,
        writable: true,
      },
      __webpack_share_scopes__: {
        value: { default: 'test-shared-scope' },
        writable: true,
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('loads & invokes the remote modules', async () => {
    const remote = {
      url: 'https://local.test/remoteEntry.js',
      name: 'testModules',
    }

    await loadRemoteModuleSystem({ remote, component: 'TestComponent' })()

    expect(webpackInitSharing).toHaveBeenCalledWith('default')
    expect(mockContainerInit).toHaveBeenCalledWith('test-shared-scope')
    expect(mockContainerGet).toHaveBeenCalledWith('./TestComponent')
  })
})
