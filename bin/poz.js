const { localPackagesLogger } = require('./utils')

module.exports = function (cli, POZ) {
  const { logger } = POZ.utils

  return {
    command: {
      name: '*',
      opts: {
        desc: 'Programmable scaffolding generator',
      },
      handler: function (input, flags) {

        // Implementation for alias
        if (cli.aliasMap[input[0]]) {
          let argv = process.argv.slice(2)
          argv[0] = cli.aliasMap[input[0]]
          return cli.parse(argv)
        }

        let pm = new POZ.PackageManager()
        if (!input.length) {
          cli.showHelp()
          localPackagesLogger(pm.cache.getItem('packagesMap'))

        } else {
          const requestName = input[0]
          const TIMEOUT = 60000
          pm.fetchPkg(requestName, TIMEOUT)
            .then(pkg => {
              if (pkg) {
                const app = new POZ(pkg.cachePath)
                return app.start()
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      }
    },
    options: [
      {
        name: 'local',
        opts: {
          alias: '-l',
          desc: 'Use a local POZ package',
          type: 'boolean'
        }
      }
    ]
  }
}
