const Cli = require('./index')
const Command = require('../command')
const { DEFAULT_PROGRAM_VERSION } = require('../constants')

describe('Cli', () => {
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})
  const mockStdout = jest.spyOn(process.stdout, 'write').mockImplementation(() => {})

  beforeEach(() => {
    mockExit.mockClear()
    mockStdout.mockClear()
  })

  describe('instantiation', () => {
    // eslint-disable-next-line max-len
    test('Given a constructor invocation of Cli, then the result is an instance of Cli class', () => {
      // Act
      const cli = new Cli()

      // Asserts
      expect(cli instanceof Cli).toEqual(true)
    })
    // eslint-disable-next-line max-len
    test('Given a instantation of new Cli, then the result is an object with al methods of Cli class', () => {
      // Act
      const cli = new Cli()

      // Asserts
      expect(cli._commands).toEqual([])
      expect(cli._version).toEqual(DEFAULT_PROGRAM_VERSION)
      expect(typeof cli.version).toEqual('function')
      expect(typeof cli.command).toEqual('function')
      expect(typeof cli.showHelp).toEqual('function')
      expect(typeof cli.run).toEqual('function')
    })
  })

  describe('version', () => {
    // eslint-disable-next-line max-len
    test('Given the invocation of version method, then the internal version is updated', () => {
      // Arrange
      const expectedVersion = '1.0.0'

      // Act
      const cli = new Cli()
      cli.version(expectedVersion)

      // Asserts
      expect(cli._version).toEqual(expectedVersion)
    })
    // eslint-disable-next-line max-len
    test('Given the invocation of version method, then the returned value is the Cli instance', () => {
      // Arrange
      const newVersion = '1.0.0'

      // Act
      const cli = new Cli()
      const updatedCli = cli.version(newVersion)

      // Asserts
      expect(updatedCli).toEqual(cli)
    })
  })

  describe('command', () => {
    test('Given the declaration of new command, then the _commands array is updated', () => {
      // Act
      const cli = new Cli()
      cli.command('is-a-test')
      cli.command('is-another-test')

      // Asserts
      expect(cli._commands).toHaveLength(2)
    })
    // eslint-disable-next-line max-len
    test('Given the invocation of command method, then the returned value is a Command instance', () => {
      // Act
      const cli = new Cli()
      const resultFromCliCommandMethodCalled = cli.command('is-a-test')

      // Asserts
      expect(resultFromCliCommandMethodCalled instanceof Command).toEqual(true)
    })
  })
})
