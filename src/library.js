import { pool } from './db.js'
import path from 'node:path'
import fs from 'node:fs/promises'

export const index = async (res) => {
  try {
    const pathToFile = path.resolve('./public/index.html')
    const html200 = await fs.readFile(pathToFile, 'utf-8')

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(html200)
  } catch (error) {
    console.log(error)
    const pathToFile500 = path.resolve('./public/500.html')
    const html500 = await fs.readFile(pathToFile500, 'utf-8')

    res.writeHead(500, { 'Content-Type': 'text/html' })
    res.end(html500)
  }
}

export const getUsersJSON = async (res) => {
  try {
    const [rowsSQL] = await pool.query('SELECT * FROM usuarios')

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(rowsSQL))
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end('<h1>Ha ocurrido un error interno en el servidor al conectar con la Base de Datos</h1><span> Explicación: ' + error.message + '</span>')
  }
}

export const exportToCSV = async (res) => {
  try {
    const sql = await pool.query('SELECT * FROM usuarios')
    const headers = 'id,nombres,apellidos,direccion,correo_electronico,dni,edad,fecha_creacion,telefono'

    let contentCSV = headers
    sql[0].forEach(row => {
      contentCSV += '\n' + Object.values(row).join(',')
    })

    await fs.writeFile('usuarios.csv', contentCSV)

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end('<body style="background-color: rgb(44, 44, 44); color: white; font-family: sans-serif; margin: 20%; text-align: center"><h1>Se ha exportado el Archivo CSV con éxito</h1><div class="botones"><a style= "color: white; font-size: 30px" href="/" id="usuarios">Inicio</a></div></body>')
    console.log('Se ha exportado el Archivo CSV con éxito')
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end('<h1>Ha ocurrido un error interno en el servidor durante la exportación</h1><span> Explicación: ' + error.message + '</span>')
  }
}

export const csvImportSQL = async (res) => {
  try {
    const csv = await fs.readFile('usuarios.csv', 'utf8')
    const headerCSV = csv.trim().split('\n')
    const csvData = headerCSV.slice(1)

    for (const row of csvData) {
      const data = row.split(',')
      const id = data[0]
      const correo = data[4]
      const dni = data[5]

      if (isNaN(id) || isNaN(dni)) {
        console.log(`Formato incorrecto en el ID o DNI. La fila que contiene el ID:${id}, no fue importada.`)
        continue
      }

      const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!regEmail.test(correo)) {
        console.log(`Formato incorrecto del correo. La fila que contiene el Correo: ${correo}, no fue importada.`)
        continue
      }

      const [existingUser] = await pool.query('SELECT id FROM usuarios WHERE id = ? OR correo_electronico = ?', [id, correo])
      if (existingUser.length > 0) {
        console.log('El ID o correo ya existen en la Base de Datos. No importado')
        continue
      }

      const query = 'INSERT INTO usuarios (id,nombres,apellidos,direccion,correo_electronico,dni,edad,fecha_creacion,telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      await pool.execute(query, data)
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end('<body style="background-color: rgb(44, 44, 44); color: white; font-family: sans-serif; margin: 20%; text-align: center"><h1>Se ha importado el archivo CSV a la base de datos SQL con éxito </h1><div class="botones"><a style= "color: white; font-size: 30px" href="/" id="usuarios">Inicio</a></div></body>')
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end('<h1>Ha ocurrido un error interno en el servidor </h1><span> Explicación: ' + error.message + '</span>')
  }
}
