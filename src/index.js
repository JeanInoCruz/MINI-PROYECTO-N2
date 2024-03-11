import http from 'http'
import { PORT } from './config.js'
import { index, getUsersJSON, exportToCSV, csvImportSQL } from './library.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  if (method === 'GET') {
    switch (url) {
      case '/':
        index(res)
        break

      case '/api/usuarios':
        getUsersJSON(res)
        break

      case '/api/usuarios/export':
        exportToCSV(res)
        break

      case '/api/usuarios/import':
        csvImportSQL(res)
        break

      default:
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end('<body style="background-color: rgb(44, 44, 44); color: white; font-family: sans-serif; margin: 20%; text-align: center"><h1>No se encontró la ruta especificada</h1><div class="botones"><a style= "color: white; font-size: 30px" href="/" id="usuarios">Inicio</a></div></body>')
        break
    }
  }
})

server.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`)
})
