const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const pool = require('./db')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// post todo
app.post('/todos', (req, _res) => {
  const query = `
    INSERT INTO todos(description, dueDate) 
    VALUES($1, $2) RETURNING *
  `
  const values = [req.body.description, req.body.dueDate]
  pool  
    .query(query, values)
    .then(res => {
      console.log('post res: ', res)
    })
    .catch(err => {
      console.log('post err: ', err)
    })
})
// update todo
// get all todos
// get todo by id
// get all completed todos
// get all incompleted todos
// delete todo by id

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(port, () => {
  console.log(`API server now listening at port ${port}`)
})