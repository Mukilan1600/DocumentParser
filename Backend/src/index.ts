import express from 'express'
import FileManager from './FileManager/FileManager'

const app = express()

app.get("/", (req,res) => {
    res.send("Hello World!")
    FileManager.createFolder();
})

app.listen(3000, () => {
    // tslint:disable-next-line:no-console
    console.log("Server Started...")
})