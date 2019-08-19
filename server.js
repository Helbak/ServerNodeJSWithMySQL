const Model = require("./model").Model;
const Logic = require("./logic.js").Logic;

const express = require("express");
const app = express();
let fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'quotation'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    console.log(' connection = mysql.createConnection ');
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

// connection.end();

const model = new Model();
const logic = new Logic();

let oldData = fs.readFileSync('text.txt', 'utf8');
model.arrayOfCandles = oldData.split('\n');

app.get("/getall", function(request, response){
        let contents = fs.readFileSync('obj.txt', 'utf8');
       response.send(contents);
});
app.get("/getallsql", function(request, response){
    let contents = model.arrayOfCandlesFromSql;
    console.log('app.get("/getallsql" ' +contents);
    response.send(contents);
});
app.use("/getlast", function(request, response){
    // console.log("response.send(model.arrayOfCandles[model  "+model.arrayOfCandles[model.arrayOfCandles.length-2])
    response.send(model.arrayOfCandles[model.arrayOfCandles.length-1]);
});
app.use("/getlastsql", function(request, response){
    // console.log("response.send(model.arrayOfCandles[model  "+model.arrayOfCandles[model.arrayOfCandles.length-2])
    response.send(model.arrayOfCandlesFromSql[model.arrayOfCandlesFromSql.length-1]);
});
app.get("/", function(request, response){
    response.send(" Main Page ")
});
app.listen(3000);

function main() {

    console.log(' last     _____'+model.arrayOfCandles[model.arrayOfCandles.length-1]);
for(let i =0; i<model.arrayOfCandles.length; i++){
    console.log(i+ '__' +model.arrayOfCandles[i]);
}
function candleCreator() {
        let date = new Date();
        let second = date.getSeconds();
        let number = logic.getRandom();
        let secondData = logic.getSecondData(number, second);
        model.addSecond(secondData);
        console.log('model.addSecond(secondData) ' + secondData.ratio);
        if (second === 59) {
            let array = model.arrayOfSeconds;
            model.arrayOfSeconds = [];
            let candle = logic.getOCHL(array, date);
            console.log(candle);
            model.addCandles(candle);
            write(candle);
            writeToMySQL(candle);
        }
    }

    setInterval(candleCreator, 1000);
}
function write(candle) {
    let jsonCandle = logic.objToJson(candle);
    fs.appendFile('text.txt', jsonCandle, function () {});
    fs.appendFile('text.txt', '\n', function () {});
    fs.appendFile('obj.txt', jsonCandle, function () {});
}
function writeToMySQL(candle) {
    const dataCandle = [candle.open, candle.close, candle.high, candle.low];
    const sql = "INSERT INTO candles(open, close, high, low) VALUES(?, ?, ?, ?)";

    connection.query(sql, dataCandle, function(err, results) {
        if(err) console.log(err);
        else console.log("Данные добавлены");
        // connection.end();
    });
};
function readFromMySQL() {
       connection.query("SELECT * FROM candles",
        function(err, results, fields) {
            model.setArrayFromSQL(results);
            // connection.end();
        });
    }
readFromMySQL();
main();
