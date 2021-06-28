const Command = require('../command')
const parseInput = require('../parseInput')
const FT = require('../utils/funcTools')
const logger = require('../logger')
const { CLI_NAME, DEFAULT_PROGRAM_VERSION, ERRORS } = require('../constants')

module.exports = class Cli {
  constructor() {
    this._version = DEFAULT_PROGRAM_VERSION
    this._commands = []
  }

  version(newVersion) {
    this._version = String(newVersion)
    return this
  }

  command(name, description = '') {
    const command = new Command(name, description)
    this._commands = FT.addToSet(command, this._commands)
    return command
  }

  run() {
    const inputArgs = process.argv.slice(2)
    const { args, options, command } = parseInput(inputArgs)

    const commandToRun = FT.find(isCommand(command), this._commands)

    FT.if({
      condition: commandToRun,
      Then: () => commandToRun.exec(args, options, command),
      Else: () => raiseInvalidCommandError(this, command),
    })
  }

  showHelp() {
    logger.title(`\n--- ${CLI_NAME} ---`)
    logger.info(`Program version: ${this.version()}`)
    logger.info('Available commands:')
    showCommandsHelp(this._commands)
  }
}

function raiseInvalidCommandError(self, command) {
  logger.errorInfo(`--- Invalid command: ${command} ---`)
  self.showHelp()
  process.exit(ERRORS.COMMAND_NOT_FOUND)
}

const isCommand = FT.curry(function(commandName, command) {
  return commandName === command.name
})

const showCommandsHelp = FT.each(function(command) {
  console.info('\n')
  command.showHelp()
})
