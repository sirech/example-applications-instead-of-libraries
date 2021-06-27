import React from 'react'
import PropTypes from 'prop-types'

const LanguageContext = React.createContext('No language provided')
export const useLanguage = () => React.useContext(LanguageContext)

export const LanguageProvider = ({ value, children }) => (
  <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
)

LanguageProvider.propTypes = {
  value: PropTypes.string,
  children: PropTypes.object,
}
