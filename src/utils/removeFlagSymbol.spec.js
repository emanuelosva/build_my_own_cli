const removeFlagSymbol = require('./removeFlagSymbol')

describe('removeFlagSymbol', () => {
  test('Given a flag string, then the result must be a string without - or -- chars', () => {
    // Arrange
    const flags = [
      '--oneFlag',
      '-o',
      '--anotherFlag',
      '-a',
      'nonFlag',
    ]

    // Act
    flags.forEach((flag) => {
      const stringWithoutFlag = removeFlagSymbol(flag)
      const expectedString = flag.replace(/(-|--)/g, '')

      // Asserts
      expect(stringWithoutFlag).toEqual(expectedString)
    })
  })
})
