import {readFileSync} from 'fs'
import {sanitizeHtml} from './sanitizer'
import {ParsedRequest, IconResolver} from './types'
import {emailIcon, phoneIcon, linkedinIcon, twitterIcon} from '../icons'
const contactIcons: {[key: string]: IconResolver} = {
  email: emailIcon,
  phone: phoneIcon,
  linkedIn: linkedinIcon,
  twitter: twitterIcon
}

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64')
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64')
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64')

function getCss(theme: string, fontSize: string) {
  let background = 'white'
  let foreground = 'rgba(20, 20, 20, 0.7)'
  let radial = 'lightgray'

  if (theme === 'dark') {
    background = 'black'
    foreground = 'white'
    radial = 'dimgray'
  }
  return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        background-image: radial-gradient(circle at 25px 25px, ${radial} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 2%, transparent 0%);
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    .card-wrapper {
        border: 1px solid #f9f3e6;
        border-radius: 8px;
        background-color: #f9f3e6;
        box-shadow: 12px 12px 20px 1px rgba(0, 0, 0, 0.1);
        width: 1050px;
        height: 600px;
    }

    .image-wrapper {
        float: left;
    }

    .profile-image {
        margin: 25%;
        border-radius: 50%;
    }

    .text-wrapper {
        margin: 0px 50px 0px 0px;
        float: right;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        color: ${foreground};
        height: 100%;
    }

    .name {
        margin-top: 50px;
        margin-bottom: 0px;
        font-size: ${sanitizeHtml(fontSize)};
    }

    .description {
        margin-top: 0px;
        font-style: italic;
        vertical-align: top;
    }

    .contact {
        height: 100%;
    }

    .contact-item {
        margin-right: 10px;
    }
    `
}

export function getHtml(parsedReq: ParsedRequest) {
  const {theme, fontSize, document} = parsedReq
  const parsedDocument = JSON.parse(document)
  const {contactInfo, description, name, profileImageUrl} = parsedDocument

  const contactItems: ({contact: string; icon: IconResolver})[] = Object.keys(contactInfo)
    .filter(key => key !== '_type')
    .map(key => ({contact: contactInfo[key], icon: contactIcons[key]}))

  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
        <div class="card-wrapper">
            <div class="image-wrapper">
                ${renderImage(profileImageUrl)}
            </div>
            <div class="text-wrapper">
                <h2 class="name">${name}</h2>
                <p class="description">${description}</p>
                <div class="contact">
                    ${renderContactItems(contactItems)}
                </div>
            </div>
        </div>
    </body>
</html>`
}

function renderContactItems(contactItems: ({contact: string; icon: IconResolver})[]) {
  let renderedItems = ''
  contactItems.forEach(item => {
    const thing = `<span class="contact-item">
        ${item.icon(15)}
        ${item.contact}
    </span>`
    renderedItems = `${renderedItems}\n${thing}`
  })
  return renderedItems
}

function renderImage(src: string, width = 'auto', height = '250') {
  const scaledImageSource = `${src}?h=${height}`
  return `<img
        class="profile-image"
        alt="Generated Image"
        src="${scaledImageSource}"
        width="${sanitizeHtml(width)}"
    />`
}
