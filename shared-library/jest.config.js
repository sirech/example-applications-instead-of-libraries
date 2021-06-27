const path = require('path')

module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  moduleDirectories: ['node_modules', path.join(__dirname, 'src')],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
