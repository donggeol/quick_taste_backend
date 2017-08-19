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

    app.get('/get_store_info', (req, res) => {
        var query = req.query.keyword;
        var url = 'https://m.map.naver.com/search2/search.nhn?';
        var path = 'query=' + encodeURIComponent(query);
        var serverData = '', _serverData = '', __serverData = '';
        var result = '';

        console.log('[POST] get map list of : ' + query);
        console.log('url : ' + url + path);

        request({
            url: url + path,
            mutipart:[{
                'content-type' :'text/html;charset=utf-8'
            }],
        }, function (error, response, body) {
            if (error) {
                console.log(error)
            } else {
                console.log('success');
            }
        })
        .on('data', function(data) {
            serverData += data;
        })
        .on('response', function(response) {
            response.setEncoding('utf8');
            response.on('data', function(data) {
                console.log('received ' + data.length + ' bytes of compressed data')
            })
            response.on('end', function() {
                var $ = cheerio.load(serverData);

                var start = serverData.indexOf("\"id\"");
                var end = serverData.indexOf(",", start+1);
                var id = serverData.substring(start+8,end-1);

                console.log("id -> " + id);
                console.log("url -> " + 'https://store.naver.com/restaurants/detail?id=' + id);

                request({
                    url: 'https://store.naver.com/restaurants/detail?id=' + id
                }, function (error, response, body) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log('success');
                    }
                })
                .on('data', function(data) {
                    _serverData += data;
                })
                .on('response', function(response) {
                    response.on('data', function(data) {
                        //console.log('received ' + data.length + ' bytes of compressed data')
                    })
                    response.on('end', function() {
                        var $ = cheerio.load(_serverData);

                        biztel = $("div.list_item_biztel").text();
                        _biztel = biztel.replace(/(^\s+|\s+$)/g, "");

                        bizaddr = $("div.list_item_address");

                        var mapaddr = '';
                        map = $(".link");
                        map.each( function() {
                            var link = $(this).attr('href');
                            if ($(this).text() == '지도보기'){
                                mapaddr = link;
                            }
                        });

                        end = bizaddr.text().indexOf("지번");
                        bizaddr = bizaddr.text().substring(0,end);
                        _bizaddr = bizaddr.replace(/(^\s+|\s+$)/g, "");


                        biztime = $("div.biztime").text();
                        _biztime = biztime.replace(/(^\s+|\s+$)/g, "");

                        console.log("biztel -> " + _biztel);
                        console.log("bizaddr -> " + _bizaddr);
                        console.log("mapaddr -> " + mapaddr);
                        console.log("biztime -> " + _biztime);

                        result = new Object();
                        result.biztel = _biztel;
                        result.bizaddr = _bizaddr;
                        result.mapaddr = mapaddr;
                        result.biztime = _biztime;

                        request({
                            url: 'https://store.naver.com/restaurants/detail?id=' + id + '&photoType=menu'
                        }, function (error, response, body) {
                            if (error) {
                                console.log(error)
                            } else {
                                console.log('success');
                            }
                        })
                        .on('data', function(data) {
                            __serverData += data;
                        })
                        .on('response', function(response) {
                            response.on('data', function(data) {
                                //console.log('received ' + data.length + ' bytes of compressed data')
                            })
                            response.on('end', function() {
                                var $ = cheerio.load(__serverData);

                                var menu_link = '';
                                thumb = $("img");
                                thumb.each( function() {
                                    var link = $(this).attr('src');
                                    if (link.indexOf('m1000') != -1){
                                        menu_link = link;
                                    }
                                });

                                result.menu_link = menu_link;
                                var jsonResult = JSON.stringify(result);
                                res.send(jsonResult);
                            })
                        })

                    })
                })
            })

        })
    });

    app.post('/get_store_info', (req, res) => {
        var query = req.body.keyword;
        var url = 'https://m.map.naver.com/search2/search.nhn?';
        var path = 'query=' + encodeURIComponent(query);
        var serverData = '', _serverData = '', __serverData = '';
        var result = '';

        console.log('[POST] get map list of : ' + query);
        console.log('url : ' + url + path);

        request({
            url: url + path,
            mutipart:[{
                'content-type' :'text/html;charset=utf-8'
            }],
        }, function (error, response, body) {
            if (error) {
                console.log(error)
            } else {
                console.log('success');
            }
        })
        .on('data', function(data) {
            serverData += data;
        })
        .on('response', function(response) {
            response.setEncoding('utf8');
            response.on('data', function(data) {
                console.log('received ' + data.length + ' bytes of compressed data')
            })
            response.on('end', function() {
                var $ = cheerio.load(serverData);

                var start = serverData.indexOf("\"id\"");
                var end = serverData.indexOf(",", start+1);
                var id = serverData.substring(start+8,end-1);

                console.log("id -> " + id);
                console.log("url -> " + 'https://store.naver.com/restaurants/detail?id=' + id);

                request({
                    url: 'https://store.naver.com/restaurants/detail?id=' + id
                }, function (error, response, body) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log('success');
                    }
                })
                .on('data', function(data) {
                    _serverData += data;
                })
                .on('response', function(response) {
                    response.on('data', function(data) {
                        //console.log('received ' + data.length + ' bytes of compressed data')
                    })
                    response.on('end', function() {
                        var $ = cheerio.load(_serverData);

                        biztel = $("div.list_item_biztel").text();
                        _biztel = biztel.replace(/(^\s+|\s+$)/g, "");

                        bizaddr = $("div.list_item_address");

                        var mapaddr = '';
                        map = $(".link");
                        map.each( function() {
                            var link = $(this).attr('href');
                            if ($(this).text() == '지도보기'){
                                mapaddr = link;
                            }
                        });

                        end = bizaddr.text().indexOf("지번");
                        bizaddr = bizaddr.text().substring(0,end);
                        _bizaddr = bizaddr.replace(/(^\s+|\s+$)/g, "");


                        biztime = $("div.biztime").text();
                        _biztime = biztime.replace(/(^\s+|\s+$)/g, "");

                        console.log("biztel -> " + _biztel);
                        console.log("bizaddr -> " + _bizaddr);
                        console.log("mapaddr -> " + mapaddr);
                        console.log("biztime -> " + _biztime);

                        result = new Object();
                        result.biztel = _biztel;
                        result.bizaddr = _bizaddr;
                        result.mapaddr = mapaddr;
                        result.biztime = _biztime;

                        request({
                            url: 'https://store.naver.com/restaurants/detail?id=' + id + '&photoType=menu'
                        }, function (error, response, body) {
                            if (error) {
                                console.log(error)
                            } else {
                                console.log('success');
                            }
                        })
                        .on('data', function(data) {
                            __serverData += data;
                        })
                        .on('response', function(response) {
                            response.on('data', function(data) {
                                //console.log('received ' + data.length + ' bytes of compressed data')
                            })
                            response.on('end', function() {
                                var $ = cheerio.load(__serverData);

                                var menu_link = '';
                                thumb = $("img");
                                thumb.each( function() {
                                    var link = $(this).attr('src');
                                    if (link.indexOf('m1000') != -1){
                                        menu_link = link;
                                    }
                                });

                                result.menu_link = menu_link;
                                var jsonResult = JSON.stringify(result);
                                res.send(jsonResult);
                            })
                        })

                    })
                })
            })

        })
    });
};

