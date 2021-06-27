import React from 'react'
import PropTypes from 'prop-types'

export default class LazyModule extends React.Component {
  static getDerivedStateFromError(error) {
    return { error }
  }

  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  componentDidCatch(_error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error('LazyModule failed while loading remote module', errorInfo)

    if (this.props.logger) {
      this.props.logger.error({
        message: 'LazyModule failed while loading remote module',
        data: errorInfo,
      })
    }
  }

  render() {
    if (this.state.error !== null) {
      const errorFallback = this.props.error

      if (React.isValidElement(errorFallback)) {
        return errorFallback
      } else if (typeof errorFallback === 'function') {
        return errorFallback({ error: this.state.error })
      } else {
        return null
      }
    }

    return (
      <React.Suspense fallback={this.props.delayed ?? null}>
        {this.props.children}
      </React.Suspense>
    )
  }
}

LazyModule.propTypes = {
  delayed: PropTypes.element,
  error: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}
