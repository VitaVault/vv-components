console.log(__dirname, __filename)

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^.+\\.(css|sass|scss)$':
      '<rootDir>/node_modules/next/dist/build/jest/__mocks__/styleMock.js',
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp)$':
      '<rootDir>/node_modules/next/dist/build/jest/__mocks__/fileMock.js',
    '^.+\\.(svg)$':
      '<rootDir>/node_modules/next/dist/build/jest/__mocks__/fileMock.js',
    '^@app': '<rootDir>/src/pages/_app.tsx',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@context/(.*)$': '<rootDir>/src/context/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1'
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': [
      './node_modules/next/dist/build/swc/jest-transformer.js',
      [Object]
    ]
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  watchPathIgnorePatterns: ['/.next/']
}
