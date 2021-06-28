/* eslint-disable new-cap */
const Argument = require('./index')
const { ERRORS } = require('../constants')

describe('Argument', () => {
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})

  beforeEach(() => {
    mockExit.mockClear()
  })

  describe('validateAguments', () => {
    // eslint-disable-next-line max-len
    test('Given a required value that is no passed, then the process must exit with error 128', () => {
      // Act
      const name = 'testValue'
      const value = undefined
      const config = { isRequired: true }

      // Act
      ;(() => new Argument(name, { value, ...config }))()

      // Asserts
      expect(mockExit).toBeCalledWith(ERRORS.INVALID_ARGUMEN)
    })
    // eslint-disable-next-line max-len
    test('Given a valid value, then the function must continue ', () => {
      // Act
      const name = 'testValue'
      const value = 'this-is-a-string'
      const config = { isRequired: true, type: String }

      // Act
      ;(() => new Argument(name, { value, ...config }))()

      // Asserts
      expect(mockExit).not.toBeCalled()
    })
  })

  describe('parseValue', () => {
    // eslint-disable-next-line max-len
    test('Given a different type value that expected, then the process must exit with error 128', () => {
      // Act
      const name = 'testValue'
      const value = 'this-is-not-a-number'
      const config = { isRequired: true, type: Number }

      // Act
      ;(() => new Argument(name, { value, ...config }))()

      // Asserts
      expect(mockExit).toBeCalledWith(ERRORS.INVALID_ARGUMEN)
    })
  })

  describe('Argument', () => {
    // eslint-disable-next-line max-len
    test('Given a valid argument according with the config, then the class returns an instance of Arguments', () => {
      // Arrange
      const inputs = [
        {
          name: 'string-no-required',
          value: undefined,
          isRequired: false,
          type: String,
          description: 'some des',
        },
        {
          name: 'string-required',
          value: 'this is a string',
          isRequired: true,
          type: String,
        },
        {
          name: 'number-required',
          value: `${Math.random() * 100}`,
          isRequired: true,
          type: Number,
        },
        {
          name: 'boolean-required',
          value: 'false',
          isRequired: true,
          type: Boolean,
          description: 'some des',
        },
        {
          name: 'date-required',
          value: `${+new Date()}`,
          isRequired: true,
          type: Date,
        },
        {
          name: 'date-string-required',
          value: new Date().toISOString(),
          isRequired: true,
          type: Date,
          description: 'some des',
        },
      ]

      // Act
      inputs.forEach(({ name, ...config }) => {
        const argument = new Argument(name, config)

        // Asserts
        expect(argument instanceof Argument).toEqual(true)
        expect(argument.name).toEqual(name)
        expect(argument.isRequired).toEqual(config.isRequired)
        expect(argument.type).toEqual(config.type)
        expect(argument.description).toBeDefined()
      })
    })
  })
})
