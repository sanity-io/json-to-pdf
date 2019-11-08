import {IncomingMessage, ServerResponse} from 'http'
import {parseRequest} from './_lib/parser'
import {getScreenshot} from './_lib/chromium'
import {getHtml} from './_lib/template'
import {writeTempFile, pathToFileURL} from './_lib/file'

const isDev = process.env.NOW_REGION === 'dev1'

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const parsedReq = parseRequest(req)
    const {text, fileType} = parsedReq
    const html = getHtml(parsedReq)

    if (fileType === 'html') {
      res.setHeader('Content-Type', 'text/html')
      res.end(html)
      return
    }

    const filePath = await writeTempFile(text, html)
    const fileUrl = pathToFileURL(filePath)
    const file = await getScreenshot(fileUrl, fileType, isDev)

    res.statusCode = 200
    res.setHeader(
      'Cache-Control',
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    )
    if (fileType === 'pdf') {
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', 'attachment; filename="business-card.pdf"')
    } else {
      res.setHeader('Content-Type', `image/${fileType}`)
    }
    res.end(file)
  } catch (e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>')
    console.error(e)
  }
}
