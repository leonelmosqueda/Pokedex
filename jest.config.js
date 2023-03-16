module.exports = {
  verbose: true,
  testEnvironment: "node",
  rootDir: 'src',
  coverageDirectory: '../coverage/',
  testPathIgnorePatterns: ['/node_modules/', '.*fixture.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '.*fixture.js'],
  transform: {
    "^.+\\.m?js$": "babel-jest"
  },
  moduleNameMapper: {},
};
