// Calendar页面的接口
import express from 'express'
import connection from '../database/db'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:  false}))

app.get(`/tmp`, (req, res) => {
  connection.query(
    `update scheme set priority='4' where scheme_id=0`,
    (err, result) => {
      if (err) throw err
      res.end(JSON.stringify(result))      
    }
  )
})

app.get('/deltodo/:scheme_id', (req, res) => {
  connection.query(
    `delete from scheme where scheme_id=?`,
    req.params.scheme_id,
    (err, result) => {
      if (err) throw err
      res.end(JSON.stringify(result))
    }
  )
})

app.get('/alltodo', (req, res) => {
  connection.query(
    'select * from scheme',
    (err, result) => {
      if (err) throw err
      res.end(JSON.stringify(JSON.parse(JSON.stringify(result))))
    }
  )
})

app.get('/datetodo/:date', (req, res) => {
  connection.query(
    `SELECT * FROM scheme 
    WHERE scheme_start_time < CAST("${req.params.date}" AS DATETIME) 
    AND scheme_end_time >CAST("${req.params.date}" AS DATETIME) 
    OR scheme_date = CAST("${req.params.date}" AS DATETIME)`,
    (err, result) => {
      if (err) throw err
      res.end(JSON.stringify(JSON.parse(JSON.stringify(result))))
    }
  )
})

interface RawTodo {
  scheme_title: string
  scheme_date: string  
  scheme_start_time: string
  scheme_end_time: string  
  priority: string
  repetition: number
  repetition_scope: string
  scheme_description: string
  state: string
  tag_name: string
  user_id: string
}

app.post('/addtodo', (req, res) => {
  connection.query(
    `insert into scheme set ?`,
      req.body,
      (err, result) => {
        if (err) throw err
        res.end(JSON.stringify(result))
       }
  )
})

export default app