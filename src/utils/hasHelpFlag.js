const FT = require('./funcTools')

module.exports = function hasHelpFlag(object) {
  return FT.or(
    FT.has('-h', object),
    FT.has('--help', object)
  )
}
