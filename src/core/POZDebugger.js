import _ from '../logger/logger'
import env from './POZENV'

function getTime() {
  return _.gray(`[${new Date().toLocaleTimeString()}]`)
}

function parseInfo(main, method, extra) {
  let finalInfo = _.bold(_.green(main))
  if (method) {
    finalInfo += '=> ' + _.magenta(method)
  }
  if (extra) {
    finalInfo += '=> ' + _.gray(extra)
  }
  return finalInfo
}

class POZDebugger {

  // @override
  start(info) {
    if (!env.isDebug) {
      return
    }
    _.debug(
      getTime(),
      'Starting',
      parseInfo(info)
    )
  }

  // @override
  end(info) {
    if (!env.isDebug) {
      return
    }
    _.debug(
      getTime(),
      'Finished',
      parseInfo(info)
    )
  }

  // @override
  trace(...info) {
    if (!env.isDebug) {
      return
    }
    _.debug(
      getTime() + ' ' + parseInfo(...info)
    )
  }
}

export default new POZDebugger()
