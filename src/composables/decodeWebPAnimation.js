/**
 * Decode animated WebP in browsers without ImageDecoder API (Safari).
 *
 * Approach:
 * 1. Parse the RIFF container to find ANMF chunks
 * 2. Extract each frame's VP8/VP8L bitstream (stripping chunk wrapper if present)
 * 3. Wrap bitstream in a standalone WebP container, decode via createImageBitmap
 * 4. Composite frames onto a canvas with correct disposal
 */

function str(view, offset, length) {
  let s = ''
  for (let i = 0; i < length; i++) s += String.fromCharCode(view.getUint8(offset + i))
  return s
}

function readUint24(view, offset) {
  return view.getUint8(offset) | (view.getUint8(offset + 1) << 8) | (view.getUint8(offset + 2) << 16)
}

/**
 * Extract raw VP8/VP8L bitstream from ANMF frame data.
 * Frame data may include the VP8/VP8L chunk wrapper (fourCC + size), or be raw bitstream.
 */
function extractBitstream(frameData) {
  const u8 = new Uint8Array(frameData)
  // Check if starts with VP8/VP8L fourCC
  if (u8.length >= 4 && u8[0] === 0x56 && u8[1] === 0x50 && u8[2] === 0x38 && (u8[3] === 0x20 || u8[3] === 0x4C)) {
    // Strip 8-byte chunk header (fourCC + size) — bitstream follows
    return frameData.slice(8)
  }
  return frameData
}

function getTagForBitstream(firstByte) {
  if (firstByte === 0x2F) return 'VP8L'
  if (firstByte === 0x9D) return 'VP8 '
  return null
}

/**
 * Wrap a raw VP8/VP8L bitstream in a minimal standalone WebP container
 */
function wrapBitstreamInWebP(bitstream) {
  const firstByte = new Uint8Array(bitstream, 0, 1)[0]
  const tag = getTagForBitstream(firstByte)
  if (!tag) return null

  const size = 12 + 8 + bitstream.byteLength
  const buf = new ArrayBuffer(size)
  const view = new DataView(buf)
  const bytes = new Uint8Array(buf)

  // RIFF header
  bytes[0] = 0x52; bytes[1] = 0x49; bytes[2] = 0x46; bytes[3] = 0x46 // "RIFF"
  view.setUint32(4, size - 8, true)
  bytes[8] = 0x57; bytes[9] = 0x45; bytes[10] = 0x42; bytes[11] = 0x50 // "WEBP"

  // Chunk tag
  bytes[12] = tag.charCodeAt(0)
  bytes[13] = tag.charCodeAt(1)
  bytes[14] = tag.charCodeAt(2)
  bytes[15] = tag.charCodeAt(3)

  // Chunk size
  view.setUint32(16, bitstream.byteLength, true)

  // Bitstream payload
  bytes.set(new Uint8Array(bitstream), 20)

  return new Blob([buf], { type: 'image/webp' })
}

/**
 * Parse animated WebP RIFF container, extract frame metadata and raw data
 */
function parseAnimatedWebP(buffer) {
  const view = new DataView(buffer)

  if (str(view, 0, 4) !== 'RIFF' || str(view, 8, 4) !== 'WEBP') {
    throw new Error('Not a valid WebP file')
  }

  let canvasW = 0, canvasH = 0
  const rawFrames = []
  let offset = 12

  while (offset < buffer.byteLength - 8) {
    const tag = str(view, offset, 4)
    const chunkSize = view.getUint32(offset + 4, true)
    const paddedSize = chunkSize + (chunkSize & 1)

    if (tag === 'VP8X') {
      const d = offset + 8
      canvasW = readUint24(view, d + 4) + 1
      canvasH = readUint24(view, d + 7) + 1
    } else if (tag === 'ANMF') {
      const d = offset + 8
      rawFrames.push({
        x: readUint24(view, d),
        y: readUint24(view, d + 3),
        w: readUint24(view, d + 6) + 1,
        h: readUint24(view, d + 9) + 1,
        duration: readUint24(view, d + 12),
        disposal: (view.getUint8(d + 15) >> 1) & 1,
        data: buffer.slice(d + 16, offset + 8 + chunkSize),
      })
    }

    offset += 8 + paddedSize
  }

  return { width: canvasW, height: canvasH, frames: rawFrames }
}

/**
 * Decode a single VP8/VP8L bitstream to an ImageBitmap
 */
async function decodeFrame(frameData) {
  const bitstream = extractBitstream(frameData)
  const blob = wrapBitstreamInWebP(bitstream)
  if (!blob) return null
  try {
    return await createImageBitmap(blob)
  } catch {
    return null
  }
}

/**
 * Main entry: decode an animated WebP from a URL.
 * Returns the same shape as the ImageDecoder path: { frames, durations, frameCount }
 */
export async function decodeAnimatedWebPFallback(url) {
  const response = await fetch(url)
  const buffer = await response.arrayBuffer()

  let parsed
  try {
    parsed = parseAnimatedWebP(buffer)
  } catch {
    return null
  }

  const { width, height, frames: rawFrames } = parsed
  if (!rawFrames.length) return null

  // Composite frames onto a canvas with disposal handling
  const compCanvas = document.createElement('canvas')
  compCanvas.width = width || 512
  compCanvas.height = height || 512
  const compCtx = compCanvas.getContext('2d')

  const resultFrames = []
  const resultDurations = []

  for (let i = 0; i < rawFrames.length; i++) {
    const f = rawFrames[i]

    // Apply previous frame's disposal before drawing this one
    if (i > 0) {
      const prev = rawFrames[i - 1]
      if (prev.disposal === 1) {
        compCtx.clearRect(prev.x, prev.y, prev.w, prev.h)
      }
    }

    // Decode this frame's VP8/VP8L data
    const bitmap = await decodeFrame(f.data)

    if (bitmap) {
      compCtx.drawImage(bitmap, f.x, f.y, f.w, f.h)
      bitmap.close()
    }

    // Snapshot current composite
    const snapshot = await createImageBitmap(compCanvas)
    resultFrames.push(snapshot)
    resultDurations.push(f.duration || 100)
  }

  return {
    frames: resultFrames,
    durations: resultDurations,
    frameCount: resultFrames.length,
  }
}
