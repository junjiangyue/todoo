// Calendar页面的接口
import express from 'express'
import connection from '../database/db'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:  false}))

app.get('/alltodo', (req, res) => {
  connection.query(
    'select * from scheme',
    (err, result) => {
      if (err) throw err
      res.end(JSON.stringify(JSON.parse(JSON.stringify(result))))
    }
  )
})

export default app