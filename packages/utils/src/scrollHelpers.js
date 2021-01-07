import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

const SCROLL_DURATION = 400

/**
 * Attaches `#` to the browser's URL. Should be called AFTER scrolling (to not mess with the scroll behaviour)
 * @param {string} id the id of an element without `#` which was scrolled to
 * @param {any} vueRouter the vue router instance eg. `this.$router`
 */
function attachHashAfterScrolling(id, vueRouter = undefined) {
  setTimeout(() => {
    if (vueRouter) {
      vueRouter.push({ hash: `#${id}` })
    } else {
      location.hash = id
    }
  }, SCROLL_DURATION)
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
  console.log(`id → `, id)
  if (!id) return
  if (mouseEvent) {
    mouseEvent.preventDefault()
    mouseEvent.stopPropagation()
  }
  const el = document.getElementById(id)
  console.log(`el → `, el)
  if (!el) return
  const target = getScrollTarget(el)
  const offset = el.offsetTop
  const duration = SCROLL_DURATION
  setScrollPosition(target, offset, duration)
  attachHashAfterScrolling(id, vueRouter)
}
