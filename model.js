

function Model() {
    this.arrayOfSeconds = [];
    this.arrayOfCandles = [];
    this.arrayOfCandlesFromSql = [];
}

Model.prototype.addSecond = function (second) {
    this.arrayOfSeconds[this.arrayOfSeconds.length] = second;
    return this.arrayOfSeconds;
};
Model.prototype.addCandles = function (candle) {
    this.arrayOfCandles[this.arrayOfCandles.length] = candle;
    console.log('Model.prototype.addCandles   '+ this.arrayOfCandles[this.arrayOfCandles.length-1]);
    return this.arrayOfCandles;
};
Model.prototype.setArrayFromSQL = function (array) {
    this.arrayOfCandlesFromSql = array;
    return this.arrayOfCandlesFromSql;
};
module.exports.Model = Model;
