import { isFullString } from 'is-what'

/**
 * Tells if an anchor link points to another domain or not
 * @param {HTMLAnchorElement} anchorEl
 * @returns {boolean}
 */
export function isExternalLink(anchorEl) {
  const baseURI = anchorEl.baseURI
  const target = baseURI.replace(/https|http/i, '')
  const current = document.baseURI.replace(/https|http/i, '')
  return target !== current
}

/**
 * any anchor link starting with just `#` is treated as same page hash links
 * or any anchor link with the same pathname as the current page and a hash
 * @param {HTMLAnchorElement} anchorEl
 * @returns {boolean}
 */
export function isSamePageHashLink(anchorEl) {
  if (isExternalLink(anchorEl) || !isFullString(anchorEl.href)) return false
  const linkWithoutBaseURI = anchorEl.href.replace(document.baseURI, '')
  if (linkWithoutBaseURI[0] === '#') return true
  const pathWithoutTrailingSlash = document.location.pathname.slice(1)
  const linkWithoutCurrentPath = linkWithoutBaseURI.replace(pathWithoutTrailingSlash, '')
  return linkWithoutCurrentPath[0] === '#'
  // basically, if we remove the current path from the target link, and it still doesn't start with #
  // then it's a different page link or a same page non-hash link
}

/**
 * The passed anchorEl is a same site other page link
 * @param {HTMLAnchorElement} anchorEl
 * @returns {boolean}
 */
export function isSameSiteOtherPageLink(anchorEl) {
  if (!isFullString(anchorEl.href)) return false
  if (isExternalLink(anchorEl)) return false
  if (isSamePageHashLink(anchorEl)) return false
  return anchorEl.pathname !== document.location.pathname
}
