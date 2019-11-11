import {launch, Page} from 'puppeteer-core'
import {getOptions} from './options'
import {FileType} from './types'

const width = 1050
const height = 600
let _page: Page | null

async function getPage(isDev: boolean) {
  if (_page) {
    return _page
  }
  const options = await getOptions(isDev)
  const browser = await launch(options)
  _page = await browser.newPage()
  return _page
}

export async function getScreenshot(url: string, type: FileType, isDev: boolean) {
  const page = await getPage(isDev)
  await page.setViewport({width, height})
  await page.goto(url)
  let file
  if (['png', 'jpeg'].includes(type)) {
    file = await page.screenshot({type: type === 'jpeg' ? 'jpeg' : 'png'})
  } else {
    const paddedHeight = height + 2 // 2 px padding keeps the PDF to a single page
    file = await page.pdf({width: `${width}px`, height: `${paddedHeight}px`, printBackground: true})
  }
  return file
}
