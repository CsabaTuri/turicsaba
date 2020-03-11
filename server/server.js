const express = require("express")
const next = require("next")
const routes = require("../routes/routes")
const app = next({ dev: "production" !== process.env.NODE_ENV })
const handle = app.getRequestHandler()
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()
  server.use(handler)
  server.get("*", (req, res) => {
    return handle(req, res)
  })
  const port = process.env.PORT || 8080
  server.listen(port, err => {
    if (err) {
      throw err
    }
    console.log(`> Ready on port ${port}...`)
  })
})
