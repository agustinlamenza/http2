import http2 from 'http2'
import fs from 'fs'

const client = http2.connect('https://localhost:8443', {
  ca: fs.readFileSync('localhost-cert.pem')
})

client.on('error', (err) => console.error(err))

client.on('stream', (pushedStream, headers) => {
  pushedStream.on('push', (responseHeaders) => {
    // Process response headers
    console.log(responseHeaders)
  })
  pushedStream.on('data', (chunk) => {
    console.log(chunk)
  })
})

const req = client.request({ ':path': '/test/como/va?saludo=comoVa' })

// req.on('response', (headers, flags) => {
//   // for (const name in headers) {
//   //   console.log(`${name}: ${headers[name]}`)
//   // }
//   console.log(headers)
//   console.log(flags)
// }

req.setEncoding('utf8')

// req.push(new Date().toString())
// setInterval(() => {
// }, 1000)

req.on('data', (chunk) => {
  console.log(chunk)
})

// req.write(new Date().toString())

req.on('end', () => {
  // console.log(`\n${data}`)
  console.log('END')
  client.close()
})

// req.end('test')
