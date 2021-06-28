const {
  FT,
  removeFlagSymbol,
} = require('../utils')

module.exports = function parseInput(inputArgs) {
  const command = inputArgs[0]

  const argumentsAndOptions = inputArgs.slice(1)
  const args = getArguments(argumentsAndOptions)
  const options = getOptions(argumentsAndOptions)

  return { command, args, options }
}

const getArguments = FT.filter(function(input) {
  return FT.and(!input.startsWith('-'), !input.startsWith('--'))
})

const getOptions = FT.pipe(
  FT.filter(isOption),
  FT.reduce(buildOptionsObject, {})
)

function isOption(input) {
  return FT.or(
    input.startsWith('-'),
    input.startsWith('--')
  )
}

function buildOptionsObject(obj, option) {
  const [dirtyName, value] = option.split('=')
  const name = removeFlagSymbol(dirtyName)

  obj[name] = value
  return obj
}
