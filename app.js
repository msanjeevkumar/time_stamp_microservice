var express = require('express');
var moment = require('moment');
var path =require('path');
var app = express();
var PORT = process.env.PORT || 5000;


// view engine setup


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'./index.html'));
});

app.get('/:str', function (req, res) {
    var str = req.params.str;
    var isTimeStamp = !!parseInt(str,10);
    var result={};
    if(isTimeStamp){
        var timestamp = parseInt(str,10);
        result.unix = timestamp;
        result.natural = moment.unix(timestamp).format('LL');
    } else if(moment(str,'MMMM DD YYYY').isValid()){
        var date = moment(str,'MMMM DD YYYY');
        result.unix = date.valueOf()/1000;
        result.natural = date.format('LL');
    } else {
        result.unix = null;
        result.natural =null;
    }

    res.json(result);
});

app.listen(PORT);
