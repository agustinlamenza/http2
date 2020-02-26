import http2 from 'http2'
import fs from 'fs'

const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
})

server.on('error', (err) => console.error(err))

server.on('stream', (stream, headers) => {
  stream.on('error', (err) => console.log(err))
  console.log(headers)
  const method = headers[http2.constants.HTTP2_HEADER_METHOD]
  const path = headers[http2.constants.HTTP2_HEADER_PATH]

  console.log(method)
  console.log(path)

  // stream is a Duplex
  stream.respond({
    [http2.constants.HTTP2_HEADER_CONTENT_TYPE]: 'text/html',
    [http2.constants.HTTP2_HEADER_STATUS]: http2.constants.HTTP_STATUS_ACCEPTED
  })

  stream.setDefaultEncoding('utf8')

  stream.write('this is a test \n')

  stream.end('<h1>Hello World!!!</h1>')
})

server.listen(8443, () => {
  console.log('Server started...')
})
