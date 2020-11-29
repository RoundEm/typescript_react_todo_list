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
      console.log('get res: ', qRes)
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
    INSERT INTO todos(description, dueDate) 
    VALUES($1, $2) RETURNING *
  `
  const values = [req.body.description, req.body.dueDate]
  pool  
    .query(qString, values)
    .then(qRes => {
      res.json(qRes.rows[0])
    })
    .catch(err => {
      console.log('post err: ', err)
    })
})
// update todo

// get todo by id
// get all completed todos
// get all incompleted todos
// delete todo by id

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

app.listen(port, () => {
  console.log(`API server now listening at port ${port}`)
})