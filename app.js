const express = require("express");
const app = express()
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

app.listen(3000, () =>
    console.log("Server running on Port 3000")
);

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){
    // Get data from post request in form
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    // Mailchimp 
    const apiKey = "1bd0b625e642bc1224dcae5e1da24f45-us14";
    const audienceID = "81aad8ada8";
    const url = `https://us14.api.mailchimp.com/3.0/lists/${audienceID}`

    // Post Data to send to MailChimp
    const postData  = {
        members : [
            { 
                email_address : email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                },
            }
        ]
    }
    const jsonData = JSON.stringify(postData);

    // Make POST request to Mailchimp
    options = {
        method : "POST",
        auth: `prince:${apiKey}`
    }
    const request = https.request(url, options, function(res){
        res.on("data", function(data){
            const serverResponse = JSON.parse(data);
            console.log(serverResponse);
        })
    })
    request.write(jsonData);
    request.end();
    
})


