import "dotenv/config"
import express from "express"
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { routes } from "./routes"


const app = express()
const serverHttp = http.createServer(app)
app.use(cors())
const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
})
app.use(express.json())
app.use(routes)

io.on("connection", socket => {
  console.log('Usuario conectado no socket ' + socket.id)
})

app.get("/github", (request, response) => {
  response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})


app.get("/signin/callback", (request, response) => {
  const { code } = request.query;

  return response.json(code)
})


export { serverHttp, io }