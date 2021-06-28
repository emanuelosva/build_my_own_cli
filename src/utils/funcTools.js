function curry(fn) {
  const arity = fn.length
  return function $curry(...args) {
    if (args.length < arity) return $curry.bind(null, ...args)
    return fn(...arguments)
  }
}

const always = curry((a, _) => a)
const identity = x => x

const add = curry((a, b) => a + b)
const multiply = curry((a, b) => a * b)

function pipe(...functions) {
  return (args) => functions.reduce((arg, fn) => fn(arg), args)
}

const map = curry((fn, arr) => arr.map(fn))

const filter = curry((fn, arr) => arr.filter(fn))

const find = curry((fn, arr) => arr.find(fn))

const reduce = curry((fn, inital, arr) => arr.reduce(fn, inital))

const each = curry((fn, arr) => arr.forEach(fn))

const addToSet = curry((newValue, array) => [...new Set([...array, newValue])])

const andThen = curry((fn, promise) => promise.then(fn))

const has = curry(
  (property, obj) => Object.prototype.hasOwnProperty.call(obj, property)
)

const _or = curry(function(firstCondition, secondCondition) {
  return firstCondition || secondCondition
})

const _and = curry(function(firstCondition, secondCondition) {
  return firstCondition && secondCondition
})

const trim = (str) => String(str).trim()

const replace = curry(function(search, replceBy, string) {
  return String(string).replace(search, replceBy)
})

function _if({ condition, Then, Else }) {
  const isFunction = typeof condition === 'function'
  const isTrue = isFunction ? condition() : condition

  const _then = Then || identity
  const _else = Else || identity

  return isTrue ? _then() : _else()
}

module.exports = {
  add,
  addToSet,
  always,
  andThen,
  curry,
  filter,
  find,
  each,
  has,
  identity,
  or: _or,
  and: _and,
  if: _if,
  map,
  multiply,
  pipe,
  reduce,
  trim,
  replace,
}
