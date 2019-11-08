import {launch, Page} from 'puppeteer-core'
import {getOptions} from './options'
import {FileType} from './types'
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
  await page.setViewport({width: 1050, height: 600})
  await page.goto(url)
  let file
  if (['png', 'jpeg'].includes(type)) {
    file = await page.screenshot({type: type === 'jpeg' ? 'jpeg' : 'png'})
  } else {
    file = await page.pdf({format: 'A6'})
  }
  return file
}
