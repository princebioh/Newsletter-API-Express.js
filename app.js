const express = require("express");
const app = express()
const bodyParser = require("body-parser")
const request = require("request")

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

app.listen(3000, () =>
    console.log("Server running on Port 3000")
);

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){
    firstName = req.body.fName;
    lastName = req.body.lName;
    email = req.body.email;
    console.log(`First Name : ${firstName}\nLast Name : ${lastName}\nEmail: ${email}`)
})