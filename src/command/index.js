const Argument = require('../argument')
const {
  FT,
  hasHelpFlag,
  mapTypeToString,
  removeFlagSymbol,
} = require('../utils')
const logger = require('../logger')

module.exports = class Command {
  constructor(name, description = '') {
    this._name = name
    this._description = description
    this._rawArguments = []
    this._rawOptions = []
    this._options = []
  }

  get name() {
    return this._name
  }

  getDescription() {
    return this._description
  }

  description(description) {
    this._description = description
    return this
  }

  option(flag) {
    const [shortFlag, largeFlag, description] = FT.map(
      FT.pipe(FT.trim, removeFlagSymbol),
      flag.split(',')
    )

    this._rawOptions = FT.addToSet(flag, this._rawOptions)
    this._options = FT.addToSet({ shortFlag, largeFlag, description }, this._options)
    return this
  }

  argument(name, { isRequired = true, type = String, description = '' } = {}) {
    this._rawArguments = FT.addToSet(
      { name, config: { isRequired, type, description } },
      this._rawArguments
    )
    return this
  }

  action(fn) {
    this._action = fn
    return this
  }

  async exec(inputArgs, options) {
    FT.if({
      condition: hasHelpFlag(options),
      Then: () => { this.showHelp(); process.exit(0) },
    })

    const cleanArgs = buildArgumentsObjet(this._rawArguments, inputArgs)
    const cleanOptions = buildOptionsObject(this._options, options)
    const result = this._action(cleanArgs, cleanOptions, this._name)

    return FT.if({
      condition: result instanceof Promise,
      Then: () => FT.andThen(FT.identity, result),
      Else: FT.always(result),
    })
  }

  showHelp() {
    logger.title(`Command - ${this._name}`)
    logger.info(`-- Description: ${this._description || 'No description available'}`)
    logger.info('-- Arguments:\n')
    logArgumentsDescription(this._rawArguments)

    console.info('\n')
    logger.info('-- Options:\n')
    logAOptionsDescription(this._rawOptions)
  }
}

const buildArgumentsObjet = FT.curry(function(rawArguments, inputArgs) {
  return rawArguments.reduce(function(obj, rawArgument, index) {
    const { name, config } = rawArgument
    obj[name] = new Argument(name, { ...config, value: inputArgs[index] }).value
    return obj
  }, {})
})

const buildOptionsObject = FT.curry(function(options, cleanOptions) {
  return options.reduce(function(obj, option) {
    const { shortFlag, largeFlag } = option

    const flag = removeFlagSymbol(largeFlag)
    const flagValue = FT.or(
      FT.has(largeFlag, cleanOptions),
      FT.has(shortFlag, cleanOptions)
    )

    obj[flag] = flagValue
    return obj
  }, {})
})

const logArgumentsDescription = FT.each(function(arg) {
  logger.info(
    `\t* ${arg.name} --> Type: ${mapTypeToString(arg.config.type)} - ${
      arg.config.isRequire ? 'Is Required' : 'Optional'
    } - Description: ${arg.config.description || ''}`
  )
})

const logAOptionsDescription = FT.each(function(option) {
  logger.info(`\t* ${option}`)
})
