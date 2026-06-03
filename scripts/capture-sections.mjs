import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { setTimeout as sleep } from 'node:timers/promises'

const PORT = 9223
const URL = 'http://localhost:5173/'
const OUT = 'shots'

async function getPageWsUrl() {
  const res = await fetch(`http://127.0.0.1:${PORT}/json/list`)
  const pages = await res.json()
  const page = pages.find((p) => p.type === 'page' && p.url.includes('5173'))
  if (!page) throw new Error('No page target found')
  return page.webSocketDebuggerUrl
}

function cdpSend(ws, id, method, params = {}) {
  return new Promise((resolve, reject) => {
    const handler = (ev) => {
      const msg = JSON.parse(ev.data)
      if (msg.id === id) {
        ws.removeEventListener('message', handler)
        if (msg.error) reject(msg.error)
        else resolve(msg.result)
      }
    }
    ws.addEventListener('message', handler)
    ws.send(JSON.stringify({ id, method, params }))
  })
}

async function main() {
  await mkdir(OUT, { recursive: true })

  const chrome = spawn(
    'google-chrome',
    [
      '--headless=new',
      '--no-sandbox',
      `--remote-debugging-port=${PORT}`,
      '--disable-gpu',
      '--window-size=1440,900',
      URL,
    ],
    { stdio: 'ignore' },
  )

  await sleep(2500)
  const wsUrl = await getPageWsUrl()
  const ws = new WebSocket(wsUrl)
  await new Promise((r) => (ws.onopen = r))

  let id = 1
  const send = (method, params) => cdpSend(ws, id++, method, params)

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  })

  const sections = [
    { name: 'about', y: 900 },
    { name: 'stack', y: 2100 },
    { name: 'work', y: 3200 },
    { name: 'process', y: 6200 },
    { name: 'contact', y: 7800 },
  ]

  for (const s of sections) {
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, ${s.y}); document.body.offsetHeight`,
    })
    await sleep(800)
    const shot = await send('Page.captureScreenshot', { format: 'png', fromSurface: true })
    const buf = Buffer.from(shot.data, 'base64')
    await import('node:fs/promises').then((fs) =>
      fs.writeFile(`${OUT}/${s.name}.png`, buf),
    )
    console.log(`wrote ${OUT}/${s.name}.png`)
  }

  ws.close()
  chrome.kill('SIGTERM')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
