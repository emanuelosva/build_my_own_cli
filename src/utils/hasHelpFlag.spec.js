const hasHelpFlag = require('./hasHelpFlag')

describe('hasHelpFlag', () => {
  test('Given a object with a valid help flag, then the function return true', () => {
    // Arrange
    const objectsWithHelpFlag = [
      { otherValue: Math.random(), '--help': true },
      { otherValue: Math.random(), '-h': true },
      { '--help': true, otherValue: Math.random() },
      { '-h': true, otherValue: Math.random() },
    ]

    // Act
    objectsWithHelpFlag.forEach((objectWithHelp) => {
      const expectedToBeTrue = hasHelpFlag(objectWithHelp)

      // Asserts
      expect(expectedToBeTrue).toEqual(true)
    })
  })
  test('Given a object without help flag, then the function return false', () => {
    // Arrange
    const objectsWithoutHelpFlag = [
      { someValue: Math.random(), anotherValue: Math.random() },
      { help: true, otherValue: Math.random() },
      { '-help': true, otherValue: Math.random() },
      { '--h': true, otherValue: Math.random() },
    ]

    // Act
    objectsWithoutHelpFlag.forEach((objectWithoutHelp) => {
      const expectedToBeFalse = hasHelpFlag(objectWithoutHelp)

      // Asserts
      expect(expectedToBeFalse).toEqual(false)
    })
  })
})
