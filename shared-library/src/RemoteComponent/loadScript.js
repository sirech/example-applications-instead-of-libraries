const cache = {}

const createLoader = (src) => {
  let resolve
  let reject

  const promise = new Promise((resolver, rejector) => {
    resolve = resolver
    reject = rejector
  })

  const { document } = window
  const script = document.createElement('script')

  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', src)

  script.addEventListener('error', (err) => {
    delete cache[src]
    reject(err)
  })

  script.addEventListener('load', () => {
    resolve(script)
  })

  document.head.appendChild(script)

  return promise
}

export const loadScript = (src) => {
  const cacheKey = src.split('?')[0]

  if (cache[cacheKey]) {
    return cache[cacheKey]
  }

  const loader = createLoader(src)
  cache[cacheKey] = loader

  return loader
}
