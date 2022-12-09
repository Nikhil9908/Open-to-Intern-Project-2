const express = require('express');
const bodyparser = require('body-parser');
const multer = require('multer');
const route = require("./routes/routs");
const {default: mongoose} = require('mongoose');
const app = express()

app.use(bodyparser.json());
app.use(multer().any());
app.use(bodyparser.urlencoded({extended: true}));


mongoose.connect("mongodb+srv://shivamp2001:shivamp2001@mycluster.au9iv5p.mongodb.net/project-open-to-intern", {
    useNewUrlParser: true
} )
       .then(()=> console.log("Mongoose is connected"))
       .catch(err => console.log(err));

app.use("/", route)

app.listen(process.env.PORT || 3001, function () {
    console.log("Express app running on port" + (process.env.PORT || 3001))
})



