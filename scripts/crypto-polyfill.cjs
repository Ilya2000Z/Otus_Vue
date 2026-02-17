const nodeCrypto = require('crypto')
const { createHash } = nodeCrypto
function hash(algorithm, data, encoding) {
  const buf = Buffer.isBuffer(data) ? data : Buffer.from(data, typeof data === 'string' ? 'utf8' : undefined)
  return createHash(algorithm).update(buf).digest(encoding)
}
nodeCrypto.hash = hash
if (typeof globalThis !== 'undefined') {
  globalThis.crypto = globalThis.crypto || {}
  globalThis.crypto.hash = hash
}
