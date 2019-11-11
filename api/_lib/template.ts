import {ParsedRequest} from './types'

function getCss(theme: string, fontSize: string) {
  let background = 'white'
  let foreground = 'black'

  if (theme === 'dark') {
    background = 'black'
    foreground = 'white'
  }
  return `
  
    body {
      background: ${background};
      font-size: ${fontSize};
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      height: 100vh;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      margin: 0;
    }
    
    .card-scene {
      color: ${foreground};
      height: 600px;
      width: 1050px;
    }
    
    .card-root {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;
    }
    
    .card-face {
      height: 100%;
      width: 100%;
      border-radius: 2rem;
    }
    
    .card-front {
      display: grid;
      grid-template-columns: 1fr min-content;
      grid-template-rows: min-content auto;
      background: linear-gradient(90deg, currentColor 10px, currentColor 10px, transparent 10px, transparent 20px, currentColor 20px, currentColor 30px, transparent 30px, transparent 40px, currentColor 40px, currentColor 50px, transparent 50px) repeat-y;
      box-sizing: border-box;
      padding: 2.5rem;
    }

    .card-back {
      background: linear-gradient(to right, currentColor, currentColor 50%, transparent 49%, transparent 100%) 100% / 25px repeat;
    }
    
    .card-logo {
      grid-column: 2;
      grid-row: 1;
      margin-right: -1rem;
      filter: invert(1);
      width: 300px;
    }
    
    .card-content {
      margin-top: auto;
      grid-column: 1;
      grid-row: 2;
      padding-left: 2.5rem;
      text-align: left;
    }
    
    h2, p {
      margin: 0;
    }

    h2 {
      text-transform: lowercase;
      font-size: 8rem;
      line-height: 7rem;
      margin-bottom: 1.2rem;
    }
    
    p {
      text-transform: uppercase;
      font-size: 1.4rem;
      letter-spacing: 3px;
      margin-bottom: 0.5rem;
    }
    `
}

export function getHtml(parsedReq: ParsedRequest) {
  const {theme, fontSize, document} = parsedReq
  const {contactInfo, name, imageUrl} = document

  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
        <div class="card-scene">
          <div class="card-root">
            <div class="card-face card-front">
              <div class="card-logo">
                <img src="${imageUrl}">
              </div>
              <div class="card-content">
                <h2>${name}</h2>
                <p class="contact-item">
                  ${contactInfo.twitter}
                </p>
                <p class="contact-item">
                  ${contactInfo.email}
                </p>
              </div>
            </div>
          </div>
          <div class="card-face card-back"></div>
        </div>
    </body>
</html>`
}
