const chalk = require('chalk')

module.exports = {
  info: (...args) => console.info(
    chalk.bold(chalk.green('[info]')),
    ...args
  ),
  error: (...args) => console.error(
    chalk.bold(chalk.redBright('[error]')),
    chalk.red(...args)
  ),
  errorInfo: (...args) => console.error(
    chalk.yellowBright(...args)
  ),
  title: (...args) => console.info(
    chalk.bold(chalk.blueBright(...args))
  ),
}
