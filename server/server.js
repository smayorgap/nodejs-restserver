require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json());
//app.use(express.json());

app.use(require('./routes/usuario'));


mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false 
    }, (err, res) => {

    if(err) throw new err;

    console.log(`Base de datos conectada`);
})


app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
})