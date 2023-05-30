// ES6
import express from "express"
let configViewEngine = (app) => {
    app.use(express.static("./src/public"))
    app.set("view engine", "ejs") //jsb,blade for if else , viết logic
        // tất cả file view nằm trong src/views
    app.set("views", "./src/views")
}


// để các js khác dùng được
module.exports = configViewEngine