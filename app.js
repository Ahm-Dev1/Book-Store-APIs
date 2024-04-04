const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser") // convert any req to JSON 
const userRouter = require("./Routers/user")
const bookRouter = require("./Routers/book")

const app = express()

app.use(bodyParser.json())

const url = "mongodb+srv://Ahm-Dev1:123auth123@authentication.nbezokz.mongodb.net/?retryWrites=true&w=majority&appName=Authentication"

const connectDB = async () =>{
    try{
        mongoose.set("strictQuery", false)
        await mongoose.connect(url)
        console.log("Connected to Mongo DB")
    }catch (err){
        console.log("error while connecting to DB" + err)
        process.exit()
    }
}
connectDB()


app.use('/', userRouter)
app.use('/', bookRouter)




app.use(function(req, res){ // if endpoint not found -> Do this
    res.status(404).send({ url: req.originalUrl + " " + "Page not Found"})
})

app.listen(8085)