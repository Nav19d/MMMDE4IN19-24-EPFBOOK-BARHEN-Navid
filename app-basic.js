const app = require('express')()
const basicAuth = require('express-basic-auth')

app.use(basicAuth({
    users: { 'admin': 'supersecret' }
}));

app.use("/",(req,res) =>{
    res.send("Success")
});