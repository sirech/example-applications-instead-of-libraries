export function remoteUrl({ environment = 'DEV', origin } = {}) {
  // This function offers the possibility of loading components from different urls.
  // For instance, you can use a staging system, or the production url.
  //
  // In this case, all the urls point to the localhost as this app is not deployed to a CDN
  if (typeof origin === 'string') {
    return `${origin}/remoteEntry.js`
  }

  if (environment === 'PROD') {
    return `http://localhost:3002/remoteEntry.js?${new Date().getTime()}`
  }

  return `http://localhost:3002/remoteEntry.js?${new Date().getTime()}`
}
