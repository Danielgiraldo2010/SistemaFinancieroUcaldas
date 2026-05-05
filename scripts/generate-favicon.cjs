const fs = require('fs')
const path = require('path')
const pngToIco = require('png-to-ico')
const sharp = require('sharp')

const input = path.join(__dirname, '..', 'public', 'logoUC.png')
const output = path.join(__dirname, '..', 'public', 'favicon.ico')

async function run() {
  try {
    if (!fs.existsSync(input)) {
      console.error('Input file not found:', input)
      process.exit(1)
    }

    const target = 1024
    const pngBuffer = await sharp(input)
      .resize({ width: target, height: target, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer()

    const buffer = await (pngToIco.default ? pngToIco.default(pngBuffer) : pngToIco.imagesToIco([pngBuffer]))
    fs.writeFileSync(output, buffer)
    console.log('favicon.ico generated at', output)
  } catch (err) {
    console.error('Failed to generate favicon.ico:', err && err.message)
    if (err && err.stack) console.error(err.stack)
    process.exit(1)
  }
}

run()
