var https = require('https');
var querystring = require('querystring');
var parseString = require('xml2js').parseString;

var phantom = require("phantom");
var webPage = require('webpage');
var _ph, _page, _outObj;
var insta_url;

module.exports = function(app, db) {

    app.post('/test', (req, res) => {
        // You'll create your note here.
        console.log(req.body)
            res.send('Hello')
    });

    //search on instagram
    app.get('/search_insta_sample', (req, res) => {
        var search = req.query.keyword;
        var queryOption = {'query':search, 'display':10, 'start':1, 'sort':'sim'};
        var query = querystring.stringify(queryOption);
        var data = "{\"item\":[";
        var encode_search;

        console.log("query : " + req.query.keyword);

        phantom.create().then(function(ph){
            _ph = ph;
            return _ph.createPage();
        }).then(function(page){
            _page = page;
            console.log(search);
            encode_search = encodeURIComponent(search) ;
            console.log(encode_search);
            insta_url = 'https://www.instagram.com/explore/tags/' + encode_search + '/';
            //insta_url = 'https://www.instagram.com/explore/tags/' + search + '/';
            console.log(insta_url);
            return _page.open(insta_url);
        }).then(function(status){
            console.log("status!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log(status);
            return _page.property('content')
        }).then(function(content){
            setTimeout(function(){
                var index = 0;
                var index_tag;
                var index_end;
                var index_tag_end, index_tag_next, count;
                var tag, tmp_tag;
                var image_link;
                var ch;
                count = 0;
                while(true){
                    index = content.indexOf("img alt",index + 1);
                    index_end = content.indexOf("class",index + 1);
                    index_tag = index;
                    tag = "";
                    ch = 0;
                    while(true){
                        index_tag = content.indexOf("#",index_tag + 1);
                        index_tag_end = content.indexOf(" ",index_tag + 1);
                        index_tag_next = content.indexOf("#",index_tag + 1);
                        if(index_tag_end > index_tag_next) index_tag_end = index_tag_next;
                        if(index_tag_end == index_end - 1) index_tag_end --;//this means last hashtag
                        if(index_tag > index_end) break;
                        if(ch == 0) tmp_tag = "\"" + content.substring(index_tag,index_tag_end) + "\"";
                        else tmp_tag = ",\"" + content.substring(index_tag,index_tag_end) + "\"";
                        tmp_tag += " ";
                        tag += tmp_tag;
                        ch = 1;
                    }
                    if(index == -1) break;
                    count++;
                    console.log("hello hello count : ", count);
                    data += "{";
                    data += "\"count\":" + "\"" + count + "\",";
                    data += "\"tag\":["+ tag + "],";
                    index = content.indexOf("src",index_end + 1);
                    index_tag = content.indexOf("\"",index + 1);
                    index_tag_end = content.indexOf("\"",index_tag + 1);
                    image_link = content.substring(index_tag + 1,index_tag_end);
                    console.log("image link : ", image_link);
                    data += " \"link\":\"" + image_link + "\"";
                    data += "},";
                }
                data = data.substring(0, data.length - 1);
                data += "]}";
                console.log(req.body)
                    res.send(data);
                _page.close();
                setTimeout(function(){
                    _ph.exit();
                },7000);
            },5000);
        }).catch(function(e){
            console.log(e);
        });
    });

    //search on instagram
    app.post('/search_insta', (req, res) => {
        var search = req.body.keyword;
        var queryOption = {'query':search, 'display':10, 'start':1, 'sort':'sim'};
        var query = querystring.stringify(queryOption);
        var data = "{\"item\":[";
        var encode_search;

        console.log("body : " + req.body.keyword);

        phantom.create().then(function(ph){
            _ph = ph;
            return _ph.createPage();
        }).then(function(page){
            _page = page;
            console.log(search);
            encode_search = encodeURIComponent(search) ;
            console.log(encode_search);
            insta_url = 'https://www.instagram.com/explore/tags/' + encode_search + '/';
            //insta_url = 'https://www.instagram.com/explore/tags/' + search + '/';
            console.log(insta_url);
            return _page.open(insta_url);
        }).then(function(status){
            console.log("status!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log(status);
            return _page.property('content')
        }).then(function(content){
            setTimeout(function(){
                var index = 0;
                var index_tag;
                var index_end;
                var index_tag_end, index_tag_next, count;
                var tag, tmp_tag;
                var image_link;
                var ch;
                count = 0;
                while(true){
                    index = content.indexOf("img alt",index + 1);
                    index_end = content.indexOf("class",index + 1);
                    index_tag = index;
                    console.log(index);
                    console.log(index_end);
                    tag = "";
                    ch = 0;
                    while(true){
                        index_tag = content.indexOf("#",index_tag + 1);
                        index_tag_end = content.indexOf(" ",index_tag + 1);
                        index_tag_next = content.indexOf("#",index_tag + 1);
                        if(index_tag_end > index_tag_next) index_tag_end = index_tag_next;
                        if(index_tag_end == index_end - 1) index_tag_end --;//this means last hashtag
                        if(index_tag > index_end) break;
                        if(ch == 0) tmp_tag = "\"" + content.substring(index_tag,index_tag_end) + "\"";
                        else tmp_tag = ",\"" + content.substring(index_tag,index_tag_end) + "\"";
                        tmp_tag += " ";
                        tag += tmp_tag;
                        ch = 1;
                    }
                    if(index == -1) break;
                    count++;
                    console.log("hello hello count : ", count);
                    data += "{";
                    data += "\"count\":" + "\"" + count + "\",";
                    data += "\"tag\":["+ tag + "],";
                    index = content.indexOf("src",index_end + 1);
                    index_tag = content.indexOf("\"",index + 1);
                    index_tag_end = content.indexOf("\"",index_tag + 1);
                    image_link = content.substring(index_tag + 1,index_tag_end);
                    console.log("image link : ", image_link);
                    data += " \"link\":\"" + image_link + "\"";
                    data += "},";
                }
                data = data.substring(0, data.length - 1);
                data += "]}";
                console.log(req.body)
                    res.send(data);
                _page.close();
                setTimeout(function(){
                    _ph.exit();
                },5000);
            },2000);
        }).catch(function(e){
            console.log(e);
        });
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
};
