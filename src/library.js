import { pool } from './db.js'
import path from 'node:path'
import fs from 'node:fs/promises'

export const index = async (res) => {
  try {
    const html200 = await readFileFromPath('./public/index.html')
    sendResponse(res, 200, html200, 'text/html')
    console.log('Respuesta 200 enviada al cliente.')
  } catch (error) {
    console.error('Error al cargar el archivo index.html:', error)
    const html500 = await readFileFromPath('./public/500.html')
    sendResponse(res, 500, html500, 'text/html')
    console.log('Respuesta 500 enviada al cliente.')
  }
}

async function readFileFromPath (filePath) {
  return await fs.readFile(path.resolve(filePath), 'utf-8')
}

function sendResponse (res, statusCode, data, contentType) {
  res.writeHead(statusCode, { 'Content-Type': contentType })
  res.end(data)
}

// Funcion para obtener los usuarios desde la base de datos y presentarlos en formato JSON

export const getUsersJSON = async (res) => {
  try {
    console.log('Obteniendo usuarios de la base de datos...')
    const rowsSQL = await fetchUsersFromDatabase()
    console.log('Enviando respuesta JSON al cliente...')
    sendJSONResponse(res, 200, rowsSQL)
  } catch (error) {
    console.error('Error al obtener usuarios de la base de datos:', error.message)
    sendErrorResponseJSON(res, 500, 'Ha ocurrido un error interno en el servidor al conectar con la Base de Datos', error.message)
  }
}

async function fetchUsersFromDatabase () {
  const [rowsSQL] = await pool.query('SELECT * FROM usuarios')
  return rowsSQL
}

function sendJSONResponse (res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

function sendErrorResponseJSON (res, statusCode, message, errorMessage) {
  console.error('Ha ocurrido un error:', errorMessage)
  res.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' })
  res.end(`<h1>${message}</h1><span> Explicación: ${errorMessage}</span>`)
}

// Funcion para exportar la base de datos a un archivo CSV

export async function exportToCSV (res) {
  try {
    const sqlData = await pool.query('SELECT * FROM usuarios')
    const headers = 'id,nombres,apellidos,direccion,correo_electronico,dni,edad,fecha_creacion,telefono'

    const csvContent = generateCSVContent(sqlData[0], headers)

    await writeCSVToFile(csvContent)

    sendSuccessResponseCSV(res)
    console.log('Se ha exportado el Archivo CSV con éxito')
  } catch (error) {
    sendErrorResponseCSV(res, error)
  }
}

function generateCSVContent (data, headers) {
  let contentCSV = headers
  data.forEach(row => {
    contentCSV += '\n' + Object.values(row).join(',')
  })
  return contentCSV
}

async function writeCSVToFile (content) {
  await fs.writeFile('usuarios.csv', content)
}

function sendSuccessResponseCSV (res) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  res.end('<body style="background-color: rgb(44, 44, 44); color: white; font-family: sans-serif; margin: 20%; text-align: center"><h1>Se ha exportado el Archivo CSV con éxito</h1><div class="botones"><a style= "color: white; font-size: 30px" href="/" id="usuarios">Inicio</a></div></body>')
}

function sendErrorResponseCSV (res, error) {
  console.error('Ha ocurrido un error:', error)
  res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
  res.end('<h1>Ha ocurrido un error interno en el servidor durante la exportación</h1><span> Explicación: ' + error.message + '</span>')
}

// Funcion para importar desde un archivo CSV a una base de datos SQL

export async function csvImportSQL (res) {
  try {
    const csv = await fs.readFile('usuarios.csv', 'utf8')
    const rows = csv.trim().split('\n').slice(1)

    for (const row of rows) {
      await processCSVRow(row)
    }

    console.log('Importación del CSV a la base de datos SQL completada con éxito.')
    sendSuccessResponse(res)
  } catch (error) {
    console.error('Error durante la importación del CSV:', error)
    sendErrorResponse(res, error)
  }
}

async function processCSVRow (row) {
  const data = row.split(',')
  const id = data[0]
  const correo = data[4]
  const dni = data[5]

  if (isNaN(id) || isNaN(dni)) {
    console.log(`Formato incorrecto en el ID o DNI. La fila que contiene el ID:${id}, no fue importada.`)
    return
  }

  const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regEmail.test(correo)) {
    console.log(`Formato incorrecto del correo. La fila que contiene el Correo: ${correo}, no fue importada.`)
    return
  }

  if (await isUserAlreadyExists(id, correo)) {
    console.log('El ID o correo ya existen en la Base de Datos. No importado')
    return
  }

  const query = 'INSERT INTO usuarios (id,nombres,apellidos,direccion,correo_electronico,dni,edad,fecha_creacion,telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  await pool.execute(query, data)
  console.log(`Fila con ID:${id} importada con éxito a la base de datos.`)
}

async function isUserAlreadyExists (id, correo) {
  const [existingUser] = await pool.query('SELECT id FROM usuarios WHERE id = ? OR correo_electronico = ?', [id, correo])
  return existingUser.length > 0
}

function sendSuccessResponse (res) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  res.end('<body style="background-color: rgb(44, 44, 44); color: white; font-family: sans-serif; margin: 20%; text-align: center"><h1>Se ha importado el archivo CSV a la base de datos SQL con éxito </h1><div class="botones"><a style= "color: white; font-size: 30px" href="/" id="usuarios">Inicio</a></div></body>')
}

function sendErrorResponse (res, error) {
  console.error('Ha ocurrido un error interno en el servidor:', error)
  res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
  res.end('<h1>Ha ocurrido un error interno en el servidor </h1><span> Explicación: ' + error.message + '</span>')
}
