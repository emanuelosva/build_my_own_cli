const FT = require('../utils/funcTools')
const logger = require('../logger')
const { CLI_NAME, ERRORS } = require('../constants')

module.exports = class Argument {
  constructor(name, {
    value,
    isRequired = true,
    type = String,
    description = '',
  }) {
    validateAgument({ value, isRequired, type, name })

    this._name = name
    this._isRequired = isRequired
    this._type = type
    this._description = description
    this._value = parseValue(value, type)
  }

  get name() {
    return this._name
  }

  get isRequired() {
    return this._isRequired
  }

  get type() {
    return this._type
  }

  get description() {
    return this._description
  }

  get value() {
    return this._value
  }
}

function validateAgument({ value, isRequired, type, name }) {
  validateExistence({ value, isRequired, name })
  validateType({ value, type, name })
}

function validateExistence({ value, isRequired, name }) {
  FT.if({
    condition: !value && isRequired,
    Then: () => raiseRequiredError(name),
  })
}

function validateType({ value, type, name }) {
  FT.if({
    condition: ![Boolean, Number, Date, String].includes(type),
    Then: raiseInvalidInputTypeError,
  })

  if (type === Boolean) validateBooleanType(value, name)
  if (type === Number) validateNumberType(value, name)
  if (type === Date) validateDateType(value, name)
}

function raiseInvalidInputTypeError() {
  throw new TypeError(`${CLI_NAME} only support: [Boolean, Number, String, Date] input types`)
}

function validateBooleanType(value, name) {
  FT.if({
    condition: ![true, 'true', 1, false, 'false', 0, '', undefined].includes(value),
    Then: () => raiseValidationError({ value, name, type: 'boolean' }),
  })
}

function validateNumberType(value, name) {
  FT.if({
    condition: value && isNaN(value),
    Then: () => raiseValidationError({ value, name, type: 'number ' }),
  })
}

function validateDateType(value, name) {
  const date = new Date(value)
  FT.if({
    condition: FT.or(isNaN(date.getTime()), date.toString() === 'Invalid Date'),
    Then: () => raiseValidationError({ value, name, type: 'date' }),
  })
}

function raiseRequiredError(name) {
  logger.error('-- Error on exec command --\n')
  logger.errorInfo(`Argument <${name}> is required`)
  process.exit(ERRORS.INVALID_ARGUMEN)
}

function raiseValidationError({ value, name, type }) {
  console.info('-- Error on exec command --')
  console.error(`Argument <${name}> must be a valid ${type}. Passed value: ${value}`)
  process.exit(ERRORS.INVALID_ARGUMEN)
}

function parseValue(value, type) {
  return FT.if({
    condition: type === Boolean,
    Then: () => parseToBoolean(value),
    Else: () => value && type(value),
  })
}

function parseToBoolean(value) {
  return [true, 'true', 1].includes(value)
}
