import http from 'http'
import { PORT } from './config.js'
import { index, getUsersJSON, exportToCSV, csvImportSQL, notFound } from './library.js'

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
        notFound(res)
        break
    }
  }
})

server.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`)
})
