function Logic() {
    this.username = "";
}

Logic.prototype.getSecondData = function (num, sec) {
    const secondData = {};
    secondData.ratio = num;
    secondData.time = sec;
    return secondData;
};
Logic.prototype.getRandom = function () {
    return (Math.random() * (1.799 - 1.100) + 1.100).toFixed(4);
};
Logic.prototype.getOCHL = function (array, date) {

    let open = array[0].ratio;
    let close = array[array.length - 1].ratio;
    let sortedArray = this.sortArray(array);
    let low = sortedArray[0].ratio;
    let high = sortedArray[sortedArray.length - 1].ratio;
    const candle = {};
    candle.open = open;
    candle.close = close;
    candle.high = high;
    candle.low = low;
    candle.date = date;
    // console.log('Writed Candle:  ' + candle.open)
    return candle;
};
Logic.prototype.sortArray = function (array) {
    function compare(a, b) {
        if (a.ratio < b.ratio) {
            return -1;
        }
        if (a.ratio > b.ratio) {
            return 1;
        }
        return 0;
    }

    return array.sort(compare);
};

// var leaderStr = JSON.stringify(leader);
// leader = JSON.parse(leaderStr);
Logic.prototype.objToJson = function (obj){
    return JSON.stringify(obj);
};
Logic.prototype.arrayObjectsToString = function (array){
    let string = array[0];
    for(let i=1; i<array.length; i++){
        string = string+array[i];
    }
    return string;
};
module.exports.Logic = Logic;