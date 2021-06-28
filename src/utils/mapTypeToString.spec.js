const mapTypeToString = require('./mapTypeToString')

describe('mapTypeToString', () => {
  test('Given an input=String function, then the return must be "String"', () => {
    // Arrange
    const type = String
    const expectedStringType = 'String'
    // Act
    const stringType = mapTypeToString(type)
    // Asserts
    expect(stringType).toEqual(expectedStringType)
  })
  test('Given an input=Number function, then the return must be "Number"', () => {
    // Arrange
    const type = Number
    const expectedStringType = 'Number'
    // Act
    const stringType = mapTypeToString(type)
    // Asserts
    expect(stringType).toEqual(expectedStringType)
  })
  test('Given an input=Boolean function, then the return must be "Boolean"', () => {
    // Arrange
    const type = Boolean
    const expectedStringType = 'Boolean'
    // Act
    const stringType = mapTypeToString(type)
    // Asserts
    expect(stringType).toEqual(expectedStringType)
  })
  test('Given an input=Date function, then the return must be "Date"', () => {
    // Arrange
    const type = Date
    const expectedStringType = 'Date'
    // Act
    const stringType = mapTypeToString(type)
    // Asserts
    expect(stringType).toEqual(expectedStringType)
  })
  // eslint-disable-next-line max-len
  test('Given an input!=[Date, String, Number, Boolean] function, then the return must be undefined', () => {
    // Arrange
    const type = Array
    const expectedStringType = undefined
    // Act
    const stringType = mapTypeToString(type)
    // Asserts
    expect(stringType).toEqual(expectedStringType)
  })
})
