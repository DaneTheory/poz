'use strict';

let _

/**
 * Initialize customized logger
 * @param logger
 */
function initLogger(logger) {
  _ = logger
}

/**
 * Flattern cached packagesMap, used to log
 * @param packages {Array[POZPackage]}
 * @returns {Array}
 */
function getPackagesMapLogData(packagesMap) {
  let packagesMapLogTableData = []
  Object.keys(packagesMap).forEach(packageName => {
    const pozPackage = packagesMap[packageName]
    // TODO remove it since we didn't have 'hide' package
    if (pozPackage.hide) {
      return;
    }
    let packagesMapLogTableDataRow = []
    packagesMapLogTableDataRow.push(packageName)
    packagesMapLogTableDataRow.push(pozPackage.origin)
    packagesMapLogTableDataRow.push(pozPackage.cachePath)
    packagesMapLogTableData.push(packagesMapLogTableDataRow)
  })
  return packagesMapLogTableData
}

/**
 * Log local packages
 * @param pkgMap
 */
function localPackagesLogger(packagesMap) {
  let packagesMapLogTableData = getPackagesMapLogData(packagesMap)
  if (!packagesMapLogTableData.length) {
    return
  }
  _.echo('  ' + _.bold('local packages'.toUpperCase()))
  _.wrap()
  _.table(packagesMapLogTableData)
  _.wrap()
}

/**
 * errorList logger
 * @param errorList
 */
function errorListLogger(packageName, errorList) {
  _.error(`Validate package ${_.packageNameStyle(packageName)} failed, see the error message below:`)
  for (let error of errorList) {
    _.wrap()
    _.echo(_.boldRed('*') + ' ' + error.message)
  }
  _.wrap()
  _.info(`You can use ${_.packageNameStyle('poz package -delete=' + packageName)} to remove this package`)
}

/**
 * Log local packages validate result
 */
function localPackagesValidateResultLogger(packageValidationResultList) {
  for (let packageValidation of packageValidationResultList) {
    let { packageName, errorList } = packageValidation
    if (errorList.length) {
      errorListLogger(packageName, errorList)
    } else {
      _.success(`package ${_.packageNameStyle(packageName)} is a valid POZ package.`)
    }
  }
}

module.exports = {
  initLogger,
  errorListLogger,
  localPackagesLogger,
  localPackagesValidateResultLogger
}
