import { connection } from './config.js'
// import mysql from 'mysql2/promise'

// const DEFAULT_CONFIG = {
//   host: 'localhost',
//   user: 'root',
//   port: 3306,
//   password: '',
//   database: 'moviesdb'
// }

// const connectionString = process.env.MYSQL_URL ?? DEFAULT_CONFIG

// const connection = await mysql.createConnection(DEFAULT_CONFIG)

export class MovieModel {
  static async getAll ({ genre }) {
    const [movies] = await connection.query(
      'SELECT title, year,  director, duration, poster, rate,  BIN_TO_UUID(id) id FROM movie;'
    )

    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      `SELECT title, year,  director, duration, poster, rate,  BIN_TO_UUID(id) id 
      FROM movie WHERE id =  UUID_TO_BIN(?);`, [id]
    )

    if (!movies.length === 0) return null
    return movies[0]
  }

  static async create ({ input }) {
    const {
      genre: genreInput, // genre is an array
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    // todo: crear la conexión de genre

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate)
        VALUES (UUID_TO_BIN("${uuid}"),?,?,?,?,?,?);`, [title, year, director, duration, poster, rate]
      )
    } catch (error) {
      // no mostrar el error al usuario porque puede enviar informacion sensible
      throw new Error('Error al crear la pelicula')
      // enviar la traza a un servicio interno
      // sendLog(error)
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate,  BIN_TO_UUID(id) id
      FROM movie WHERE id = UUID_TO_BIN(?);`, [uuid]
    )

    return movies[0]
  }

  static async delete ({ id }) {
    // ejercicio: crear el delete
  }

  static async update ({ id, input }) {
    // ejercicio: crear el update
  }
}
