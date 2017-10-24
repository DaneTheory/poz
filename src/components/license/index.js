import Component from '../Component'
import DEFAULT_TEMPLATE from './default/template.md'
import DEFAULT_CONFIG from './default/config'

/**
 * new License([template,] config)
 */
export default class License extends Component {

  constructor(template, config) {
    super({ template, config, DEFAULT_TEMPLATE, DEFAULT_CONFIG })
  }

  static create(...args) {
    return new License(...args).render()
  }
}
