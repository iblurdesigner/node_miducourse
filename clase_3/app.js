const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie } = require('./schemas/movies')


const app = express()
app.use(express.json())
const PORT =  process.env.PORT ?? 1234
app.disable('x-powered-by')

app.get('/', (req, res) => {
    res.json({message: 'Hola mundo'})
})

app.get('/movies', (req, res) => {
    const {genre} = req.query
    if(genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some( g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    const {id} = req.params
    const movie = movies.find( movie => movie.id === id)
    if(movie) return res.json(movie)

    res.status(404).json({message: 'Movie not found'})
})

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)

    if(!result.success){
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const newMovie = {
        id: crypto.randomUUID(),         // crea un uuid random
        ...result.data
    }

    movies.push(newMovie)

    res.status(201).json(newMovie)
})

app.listen(PORT, (req, res) => {
    console.log(`server listening on PORT http:localhost:${PORT}`)
})