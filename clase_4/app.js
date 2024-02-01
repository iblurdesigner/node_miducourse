import express, { json } from 'express';
import {moviesRouter} from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js';

// import movies from './movies.json' assert {type: 'json'}; // <-- esto es experimental usar con precaucion
// una forma de leer JSON en ESModules seria esta:
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// forma recomendada de leer JSON en ESModules:
// import { createRequire } from 'node:module';
// const require = createRequire(import.meta.url);
// const movies = require('./movies.json')

// el import del FUTURO sera asi:
// import movies from './movies.json' with {type: 'json'}

// utilizando un arhcivo utils para hacer ese servicio desde alla



const app = express();
const PORT = process.env.PORT ?? 1234
app.disable('x-powered-by');
app.use(json());
// app.use(corsMiddleware())


// Todos los recursos que sean MOVIES se identifican con /movies
app.use('/movies', moviesRouter)



// puerto del servidor
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})