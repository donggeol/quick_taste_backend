var https = require('https');
var querystring = require('querystring');
var parseString = require('xml2js').parseString;
var cheerio = require("cheerio"); 
var request = require("request");

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

        console.log('[GET] keyword : ' + search);

        var options = {
            host: host,
            port: port,
            path: uri + query,
            method: 'GET',
            headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
        };

        console.log(req.body)

            req = https.request(options, function(response) {
                console.log('STATUS: ' + res.statusCode);
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

    app.post('/search_naver', (req, res) => {
        var search = req.body.keyword;
        var queryOption = {'query':search, 'display':10, 'start':1, 'sort':'sim'};
        var query = querystring.stringify(queryOption);
        var client_id = 'A9PK0LPb6izP6EWhLnM5';
        var client_secret = 'aesZzF3PKh';
        var host = 'openapi.naver.com';
        var port = 443;
        var uri = '/v1/search/blog.xml?';

        console.log('[POST] keyword : ' + search);

        var options = {
            host: host,
            port: port,
            path: uri + query,
            method: 'GET',
            headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
        };

        console.log(req.body)

            req = https.request(options, function(response) {
                console.log('STATUS: ' + res.statusCode);
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


    app.post('/get_store_info', (req, res) => {
        var query = req.body.keyword;
        var url = 'https://search.naver.com/search.naver?';
        var path = 'query=' + query;

        console.log('[POST] get store info of : ' + query);

        //options = {
        //    hostname: 'search.naver.com',
        //    port: 443,
        //    path: '/search.naver?',
        //    method: 'GET'
        //};

        request({
            url: url+path,
            //proxy: 'http://www.rapidproxy.org/'
        }, function (error, response, body) {
            if (error) {
                console.log(error)
            } else {
                console.log(response)
            }
        });

        //req = https.request(options, function (response) {
        //    get_store_info_of(response, res);
        //});

        //req.on('error', (e) => {
        //    console.error(e);
        //});

        //req.end();
    });
};

function get_store_info_of(response, res) {

    var serverData = '';
    response.on('data', function (chunk) {
        serverData += chunk;
    });

    response.on('end', function () {
        var $ = cheerio.load(serverData);

        more_icon = $("div.footer_wrap").text();

        more_icon_ = more_icon.replace(/(^\s+|\s+$)/g, "");
        
        console.log("Find by class : api_more_icon -> " + more_icon);
        console.log("Find by class : trimmed -> " + more_icon_);

        result = $("#footer").text();                     
        result2 = result.replace(/(^\s+|\s+$)/g, "");     
        console.log("Find by id : text_0 -> " + result2);
        
        res.send(serverData);
    });

    //return "store info"
}
