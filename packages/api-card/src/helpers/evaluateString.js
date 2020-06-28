import json5 from 'json5'
import { mapObject } from 'map-anything'

/**
 * Tries to evaluate a string with `eval()` and if failed with `json5.parse()`.
 *
 * @export
 * @param {string} str
 * @returns {*}
 */
export function evaluateString (str) {
  try {
    if (str[0] === '{' && str[str.length - 1] === '}') {
      return json5.parse(str)
    }
    const evaluated = eval(str)
    return evaluated
  } catch (error) {
    try {
      return json5.parse(str)
    } catch (error) {}
  }
}

/**
 * Tries to evaluate an object with all stringified values
 *
 * @export
 * @param {object} obj
 * @returns {object}
 */
export function evaluateObject (obj) {
  return mapObject(obj, evaluateString)
}
