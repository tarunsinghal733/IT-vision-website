var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))
//mongodb://127.0.0.1:27017/foodie-db mongosh show dbs 
mongoose.connect('mongodb+srv://itvisiondata:MeIh39g77wecevdO@cluster0.i2c5rgw.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))

app.post("/itvisiondata", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var msgcontent = req.body.msgcontent;

    var data = {
        "name": name,
        "email": email,
        "subject":subject,
        "msgcontent": msgcontent
    };
    
    console.log(data);
    db.collection('itvisiondata').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    return res.redirect('index.html');
});
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(5400);
console.log("listening on PORT 5400");