const express = require("express")
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require("./DataBase/config");
connectDB();
const cors = require("cors");

const app = express()
app.use(express.json())
app.use(cors())

const port = 3000

app.get("/", (req, res) => {
    res.send("Hello World!")
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
