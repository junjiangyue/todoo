import express from 'express'
import { AddressInfo } from 'net'
import CalendarAPI from './routes/calendar'

const app = express()

app
  // 配置各API路由
  .use('/api', CalendarAPI) 

// 启动服务器
const server = app.listen(3193, () => {
  const host = (server.address() as AddressInfo).address
  const port = (server.address() as AddressInfo).port
  console.log(`Server is running at http://%s:%s`, host, port)
})