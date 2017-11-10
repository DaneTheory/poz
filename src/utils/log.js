import chalk from 'chalk'
import {simpleStringParser} from './parser'
import {env} from './env'

const GLOBAL_INDENT = '  '
const COLOR_REG = /<([\w]+)>([^<>]*)<\/\1>/g
export const echo = (...args) => console.log(...args)
export const COLOR = chalk

export const simplelogMsgParser = msg => {
  return simpleStringParser(msg, {
    reg: COLOR_REG,
    onMatch: (matchPart, tagName, tagContent) => {
      if (!COLOR[tagName]) {
        if (env.IS_DEV) {
          echo(`Skipped unknown tag ${tagName}`)
        }
        return tagContent
      } else {
        return COLOR[tagName](tagContent)
      }
    }
  })
}

export const parseColor = simplelogMsgParser

export const simpleColorLog = (color, type) => {
  return (msg) => {
    const msgType = type ? COLOR[color](type) + ' ' : ''
    const fullMsg = msgType + msg
    echo(parseColor(
      fullMsg.replace(/(^)/gm, `$1${GLOBAL_INDENT}`)
    ))
  }
}

export const success = simpleColorLog('green', '[success]')
export const error = simpleColorLog('red', '[error]')
export const warn = simpleColorLog('yellow', '[warn]')
export const info = simpleColorLog('cyan', '[info]')
export const print = simpleColorLog()
