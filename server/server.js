require('./config/config');
const express = require('express')
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
//app.use(express.json());

app.get('/usuario', (req, res) => {
    res.json('get Usuario')
});

app.post('/usuario', (req, res) => {

    let persona = req.body



    res.json({
        persona
    })
});


app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    res.json({
        id,

    })
});


app.delete('/usuario', (req, res) => {
    res.json('delete Usuario')
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`);
})