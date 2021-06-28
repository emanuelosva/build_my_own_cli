module.exports = function mapTypeToString(type) {
  if (type === String) return 'String'
  if (type === Number) return 'Number'
  if (type === Boolean) return 'Boolean'
  if (type === Date) return 'Date'
  return undefined
}
