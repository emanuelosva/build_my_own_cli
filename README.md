# CLI

A simple CLI framework "build-my-own" with cero dependencies.

### Todos:

- Add no only boolean options

### Usage

```js
  const Cli = require('cli')

  const cli = new Cli()

  cli
    .command('hello', 'display a gretting')
    .arguments('name', { type: String, description: '' })
    .arguments('age', { type: Number, required: false })
    .option('-c, --colorized, show gretting with color')
    .action((args, options, command) => {
      if (options.colorized) console.info(chalk.blue(`Hello ${args.name}`))
      else console.log(`Hello ${args.name} from: cli-${command}`)
    })

  cli.run()
```
