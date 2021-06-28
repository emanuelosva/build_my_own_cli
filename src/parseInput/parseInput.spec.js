const parseInput = require('./index')

describe('parseInput', () => {
  test('', () => {
    // Arrange
    const expectedCommand = 'command'
    const expectedArgs = ['arg1', 'arg2']
    const receivedOptions = { '--option1': undefined, '-o2': undefined }
    const expectOptions = { option1: undefined, o2: undefined }
    const inputs = [
      expectedCommand,
      ...expectedArgs,
      ...Object.keys(receivedOptions),
    ]

    // Act
    const { command, args, options } = parseInput(inputs)

    // Asserts
    expect(command).toEqual(expectedCommand)
    expect(options).toStrictEqual(expectOptions)
    expect(args).toStrictEqual(expectedArgs)
  })
})
