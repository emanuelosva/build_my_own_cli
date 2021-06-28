const Cli = require('../src')

const cli = new Cli()

cli
  .command('hello', 'display a gretting')
  .argument('name', { type: String, required: true, description: 'Name' })
  .argument('age', { type: Number })
  .option('-c, --colorized', 'show gretting with color')
  .action((args, options, command) => {
    if (options.colorized) {
      console.info(`Hello ${args.name} with color`)
    } else {
      console.log(`Hello ${args.name} from: cli-${command}`)
    }
  })

cli
  .command('hello2', 'display a gretting2')
  .argument('name', { type: String, required: true, description: 'Name' })
  .argument('age', { type: Number })
  .option('-c, --colorized', 'show gretting with color')
  .action((args, options, command) => {
    if (options.colorized) {
      console.info(`Hello ${args.name} with color`)
    } else {
      console.log(`Hello ${args.name} from: cli-${command}`)
    }
  })

cli.run()
