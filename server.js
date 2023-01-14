const http = require('http')
const app = require('./app')

const normalizePort = val => { // if val : string > convert to a number; if the result isn't a number > false
  const port = parseInt(val, 10)
  if (isNaN(port)) { return val }
  if (port >= 0) { return port }
  return false;
};

const errorHandler = error => {
  if (error.syscall !== 'listen') { throw error }
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.')
      process.exit(1)
      break
    default:
      throw error
  }
}

const port = normalizePort(process.env.PORT || '4000') // if port 4000 unav or if the env running the server send us another port to use
app.set('port', port)
const server = http.createServer(app) // function that will be called each time the server receive a request, here the express app is passed

server.on('error', errorHandler)

server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
  console.log('Listening on ' + bind)
})

server.listen(port)

