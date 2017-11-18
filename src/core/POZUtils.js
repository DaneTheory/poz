import {isString, isPlainObject, isFunction, isUndefined} from '../utils/datatypes'
import POZError from './POZError.js'

export function mergePOZDestConfig(destConfig, userDestConfig) {

  if (isString(userDestConfig)) {
    destConfig.target = userDestConfig
    return;
  }

  if (isFunction(userDestConfig)) {
    userDestConfig = userDestConfig()
  } else if (!isPlainObject(userDestConfig)) {
    throw new POZError('Expect "dest" to be a string, function or a plain object')
  }

  Object.keys(destConfig).forEach(key => {
    if (!isUndefined(userDestConfig[key])) {
      destConfig[key] = userDestConfig[key]
    }
  });

  if (!isFunction(destConfig.render)) {
    throw new POZError('Expect "dest.render" to be a function')
  }
}