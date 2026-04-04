import { writeFileSync } from 'fs'
import zlib from 'zlib'

function createPNG(width, height, rgbFn) {
  const SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  function crc32(buf) {
    let crc = 0xffffffff
    for (const b of buf) {
      crc ^= b
      for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
    }
    return (crc ^ 0xffffffff) >>> 0
  }

  function chunk(type, data) {
    const t = Buffer.from(type)
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
    const crcBuf = Buffer.concat([t, data])
    const c = Buffer.alloc(4); c.writeUInt32BE(crc32(crcBuf))
    return Buffer.concat([len, t, data, c])
  }

  // IHDR
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8  // bit depth
  ihdr[9] = 2  // color type RGB

  // Image data
  const raw = []
  for (let y = 0; y < height; y++) {
    raw.push(0) // filter byte
    for (let x = 0; x < width; x++) {
      const [r, g, b] = rgbFn(x, y, width, height)
      raw.push(r, g, b)
    }
  }

  const compressed = zlib.deflateSync(Buffer.from(raw))

  return Buffer.concat([
    SIGNATURE,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// Create 1200x630 OG image — flat warm canvas (#F7F6F3 = 247, 246, 243)
const png = createPNG(1200, 630, () => [247, 246, 243])

writeFileSync('public/og-image.png', png)
console.log('Generated public/og-image.png (1200x630, flat canvas color)')
console.log('Note: Replace with designed OG image before launch')
