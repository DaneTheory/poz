import debug from '../core/POZDebugger'

/**
 * POZ Package
 */
export default class POZPackage {
  constructor({ requestName, packageName, cachePath, origin }) {
    debug.trace('POZPackage', 'constructor')

    this.requestName = requestName
    this.packageName = packageName
    this.cachePath = cachePath
    this.origin = origin
  }
}
