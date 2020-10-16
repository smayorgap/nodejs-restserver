//PUERTO
process.env.PORT = process.env.PORT || 3000;

//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//BASE DE DATOS
let urlDB;

if (process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafeteria';
} else {
    urlDB = 'mongodb+srv://stuardo:OAGZYoUFsGsmXTx3@cluster0.wpfur.mongodb.net/cafeteria';
}

process.env.URLDB = urlDB;