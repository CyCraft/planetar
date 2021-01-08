import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

/**
 * Pushes the given hash to the URL using primarily pushState if available to prevent the
 * scroll from jumping to the hash element. Uses window.location.hash as a fallback.
 *
 * @param {String} hash The hash value to be pushed
 */
function pushHashToUrl(hash) {
  if (window.history.pushState) {
    const pathname = window.location.pathname
    window.history.pushState(null, null, `${pathname}#${hash}`)
    return
  }
  window.location.hash = hash
}

/**
 * Finds an element by ID and scrolls to it.
 * @param {string} id the id of an element without `#`
 * @param {any} vueRouter the vue router instance eg. `this.$router`
 * @param {MouseEvent} mouseEvent if it involved a click event, pass the mouse event to preventDefault and stopPropagation
 * @returns {void}
 * @example scrollToElId('api-card')
 */
export function scrollToElId(id = '', vueRouter = undefined, mouseEvent = undefined) {
  if (!id) return
  if (mouseEvent) {
    mouseEvent.preventDefault()
    mouseEvent.stopPropagation()
  }
  const el = document.getElementById(id)
  if (!el) return
  // for Vue router, need to push hash before scrolling to prevent jumping after scroll
  if (vueRouter) {
    vueRouter.push({ hash: `#${id}` })
  }
  const target = getScrollTarget(el)
  const offset = el.offsetTop
  const duration = 400
  setScrollPosition(target, offset, duration)
  // that's all for vueRouter!
  if (vueRouter) return
  // otherwise, let's attach `#` to the browser's URL. Should be called AFTER scrolling (to not mess with the scroll behaviour)
  setTimeout(() => {
    pushHashToUrl(id)
  }, duration + 1)
}
