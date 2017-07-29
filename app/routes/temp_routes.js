var https = require('https');
var querystring = require('querystring');
var parseString = require('xml2js').parseString;

module.exports = function(app, db) {
    app.post('/test', (req, res) => {
        // You'll create your note here.
        console.log(req.body)
            res.send('Hello')
    });

    //search on instagram
    app.get('/search_insta', (req, res) => {
        console.log(req.body)
            res.send('Hello')
    });

    // search on naver blog
    app.get('/search_naver', (req, res) => {
        var search = req.query.keyword;
        var queryOption = {'query':search, 'display':10, 'start':1, 'sort':'sim'};
        var query = querystring.stringify(queryOption);
        var client_id = 'A9PK0LPb6izP6EWhLnM5';
        var client_secret = 'aesZzF3PKh';
        var host = 'openapi.naver.com';
        var port = 443;
        var uri = '/v1/search/blog.xml?';

        var options = {
            host: host,
            port: port,
            path: uri + query,
            method: 'GET',
            headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
        };

        req = https.request(options, function(response) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            response.setEncoding('utf8');
            response.on('data', function (xml) {
                parseString(xml, function(err, result){
                    var data = JSON.stringify(result);
                    res.send(data);
                });
            });
        });
        req.end();
    });
};
