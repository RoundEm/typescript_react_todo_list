const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const pool = require('./db')
// console.log('pool: ', pool)
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

// get all todos
app.get('/todos', (req, res) => {
  const qString = `SELECT * FROM todos`
  
  pool
    .query(qString)
    .then(qRes => {
      res.json(qRes.rows)
    })
    .catch(err => {
      console.log('post err: ', err)
    })
})

// post todo
app.post('/todos', (req, res) => {
  // console.log('post todo req: ', req)
  const qString = `
    INSERT INTO todos(description, due_date) 
    VALUES($1, $2) RETURNING *
  `
  const values = [req.body.description, req.body.due_date]

  pool  
    .query(qString, values)
    .then(qRes => {
      res.json(qRes.rows[0])
    })
    .catch(err => {
      console.log('post err: ', err)
      res.send(err)
    })
})

// delete todo by id
app.delete('/todos/:id', (req, res) => {
  // console.log('post todo req: ', req)
  const qString = `
    DELETE FROM todos
    WHERE id=${req.params.id}
  `

  pool  
    .query(qString)
    .then(qRes => {
      console.log('delete res: ', qRes)
      res.send(qRes)
    })
    .catch(err => {
      console.log('post err: ', err)
    })
})

// toggle todo completed
app.put('/todos/:id/:completed', (req, res) => {
  // console.log('req.params: ', req.params)
  const qString = `
    UPDATE todos
    SET completed=${req.params.completed} 
    WHERE id=${req.params.id}
  `

  pool
    .query(qString)
    .then(qRes => {
      // console.log('toggle res: ', qRes)
      res.send(qRes)
    })
    .catch(err => {
      console.log('toggle err: ', err)
    })
})

// TODO: should i add routes for these?
// get todo by id
// get all completed todos
// get all incompleted todos

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

app.listen(port, () => {
  console.log(`API server now listening at port ${port}`)
})