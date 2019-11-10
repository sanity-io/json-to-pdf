import {IncomingMessage} from 'http'
import {parse} from 'url'
import {ParsedRequest, Theme} from './types'

function resolveFileType(extension: string): any {
  return ['pdf', 'png', 'jpeg', 'html'].includes(extension) ? extension : 'pdf'
}

export function parseRequest(req: IncomingMessage) {
  console.log('HTTP -=> ', req.url)
  const {pathname = '/', query = {}} = parse(req.url || '', true)
  const {fontSize, images, widths, heights, theme, md, document, fileType = ''} = query

  if (Array.isArray(fontSize)) {
    throw new Error('Expected a single fontSize')
  }
  if (Array.isArray(theme)) {
    throw new Error('Expected a single theme')
  }

  const arr = pathname.slice(1).split('.')
  let text = ''
  if (arr.length === 0) {
    text = ''
  } else if (arr.length === 1) {
    text = arr[0]
  } else {
    text = arr.join('.')
  }

  const parsedRequest: ParsedRequest = {
    fileType: resolveFileType(fileType.toString()),
    text: decodeURIComponent(text),
    theme: theme === 'dark' ? 'dark' : 'light',
    md: md === '1' || md === 'true',
    fontSize: fontSize || '48px',
    images: getArray(images),
    widths: getArray(widths),
    heights: getArray(heights),
    document
  }
  parsedRequest.images = getDefaultImages(parsedRequest.images, parsedRequest.theme)
  return parsedRequest
}

function getArray(stringOrArray: string[] | string): string[] {
  return Array.isArray(stringOrArray) ? stringOrArray : [stringOrArray]
}

function getDefaultImages(images: string[], theme: Theme): string[] {
  if (
    images.length > 0 &&
    images[0] &&
    images[0].startsWith('https://assets.zeit.co/image/upload/front/assets/design/')
  ) {
    return images
  }
  return theme === 'light'
    ? ['https://assets.zeit.co/image/upload/front/assets/design/now-black.svg']
    : ['https://assets.zeit.co/image/upload/front/assets/design/now-white.svg']
}
