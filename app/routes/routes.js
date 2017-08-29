var https = require('https');
var querystring = require('querystring');
var parseString = require('xml2js').parseString;
var cheerio = require("cheerio");
var request = require("request");

var phantom = require("phantom");
var _ph, _page, _outObj;
var insta_url;

module.exports = function(app, db) {

    app.post('/test', (req, res) => {
        // You'll create your note here.
        console.log(req.body)
            res.send('Hello')
    });
/*
    app.post('/post_blog_image', (req, res) => {
        var query = req.body.keyword;
        var url = 'http://blog.naver.com/celinicious/221069169411';
        var path = 'query=' + encodeURIComponent(query);
        var serverData = '', _serverData = '', __serverData = '';
        var result = '';

        console.log('----------------------------------------------------------------------');
        console.log('post_blog_image start');
        console.log('----------------------------------------------------------------------');
        console.log('[POST] get map list of : ' + query);
        console.log('url : ' + url + path);

        request({
            url: query,
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

                var start = serverData.indexOf("name=\"mainFrame\"");
                var end = serverData.indexOf("\"", start+22);
                var id = serverData.substring(start+22,end);

                console.log("id -> " + id);
                console.log("url -> " + 'http://blog.naver.com' + id);

                request({
                    url: 'http://blog.naver.com' + id
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
                        var id;

                        var start = _serverData.indexOf("<div id=\"post-area\">");
                        console.log("start1 : " + start);
                        start = _serverData.indexOf("<div id=\"postListBody\">",start);
                        console.log("start1 : " + start);
                        var tmpstart = _serverData.indexOf("<div id=\"postViewArea\">",start);
                        console.log("tmp start1 : " + tmpstart);
                        if(tmpstart != -1) start = tmpstart;
                        start = _serverData.indexOf("<img",start+1);
                        console.log("<img> find : " + start);
                        start = _serverData.indexOf("<img",start+1);
                        console.log("<img> find : " + start);
                        start = _serverData.indexOf("<img",start+1);
                        console.log("<img> find : " + start);
                        start = _serverData.indexOf("<img",start+1);
                        console.log("<img> find : " + start);
                        start = _serverData.indexOf("<img",start+1);
                        console.log("<img> find : " + start);
                        start = _serverData.indexOf("<img",start+1);
                        console.log("<img> find : " + start);
                        var img_start = _serverData.indexOf("src", start);
                        console.log("img start : " + img_start);
                        var img_end = _serverData.indexOf("\"", img_start+5);
                        console.log("img end : " + img_end);
                        var id = _serverData.substring(img_start+5,img_end);

                        console.log("id -> " + id);
                        res.send(id);
                    })
                })
            })
        })
    });
*/
    app.get('/get_blog_image', (req, res) => {
        var query = req.query.keyword;
        var url = 'http://blog.naver.com/ebseb1/221035510409';
        var path = 'query=' + encodeURIComponent(query);
        var serverData = '', _serverData = '', __serverData = '';
        var result = '';

        console.log('[POST] get map list of : ' + query);
        console.log('url : ' + url + path);

        request({
            url: query,
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

                var start = serverData.indexOf("name=\"mainFrame\"");
                var end = serverData.indexOf("\"", start+22);
                var id = serverData.substring(start+22,end);

                console.log("id -> " + id);
                console.log("url -> " + 'http://blog.naver.com' + id);

                request({
                    url: 'http://blog.naver.com' + id
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
                        var id;

                        var start = _serverData.indexOf("<div id=\"post-area\">");
                        console.log("start1 : " + start);
                        start = _serverData.indexOf("<div id=\"postListBody\">",start);
                        console.log("start1 : " + start);
                        var tmpstart = _serverData.indexOf("<div id=\"postViewArea\">",start);
                        console.log("tmp start1 : " + tmpstart);
                        if(tmpstart != -1) start = tmpstart;
                        start = _serverData.indexOf("<img",start+1);
                        console.log("<img> find : " + start);
                        start = _serverData.indexOf("<img",start+1);
                        console.log("<img> find : " + start);
                        start = _serverData.indexOf("<img",start+1);
                        console.log("<img> find : " + start);
                        start = _serverData.indexOf("<img",start+1);
                        console.log("<img> find : " + start);
                        start = _serverData.indexOf("<img",start+1);
                        console.log("<img> find : " + start);
                        start = _serverData.indexOf("<img",start+1);
                        console.log("<img> find : " + start);
                        var img_start = _serverData.indexOf("src", start);
                        console.log("img start : " + img_start);
                        var img_end = _serverData.indexOf("\"", img_start+5);
                        console.log("img end : " + img_end);
                        var id = _serverData.substring(img_start+5,img_end);

                        console.log("id -> " + id);
                        res.send(id);
                    })
                })
            })
        })
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
                        var blog_data = JSON.stringify(result);

                        var blog_start = blog_data.indexOf("item");
                        var blog_end = blog_data.indexOf("item");
                        var url = '';
                        for(;;){
                            var serverData = '', _serverData = '', __serverData = '';
                            blog_start = blog_data.indexOf("\"link\"",blog_start + 1);
                            if(blog_start == -1) break;
                            blog_end = blog_data.indexOf(",",blog_start);
                            url = blog_data.substring(blog_start+9,blog_end-2);

                            console.log("log start" + " " + blog_start);
                            console.log("log end " + blog_end);
                            console.log('url : ' + url);

                            request({
                                url: url,
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

                                    var start1 = serverData.indexOf("name=\"mainFrame\"");
                                    var end1 = serverData.indexOf("\"", start1+22);
                                    var id1 = serverData.substring(start1+22,end1);

                                    console.log("id1 -> " + id1);
                                    //console.log("url -> " + 'http://blog.naver.com' + id);

                                    request({
                                        url: 'http://blog.naver.com' + id1
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
                                            var id;

                                            var start = _serverData.indexOf("<div id=\"post-area\">");
                                            console.log("start1 : " + start);
                                            start = _serverData.indexOf("<div id=\"postListBody\">",start);
                                            console.log("start1 : " + start);
                                            var tmpstart = _serverData.indexOf("<div id=\"postViewArea\">",start);
                                            console.log("tmp start1 : " + tmpstart);
                                            if(tmpstart != -1) start = tmpstart;
                                            start = _serverData.indexOf("<img",start+1);
                                            console.log("<img> find : " + start);
                                            start = _serverData.indexOf("<img",start+1);
                                            console.log("<img> find : " + start);
                                            start = _serverData.indexOf("<img",start+1);
                                            console.log("<img> find : " + start);
                                            start = _serverData.indexOf("<img",start+1);
                                            console.log("<img> find : " + start);
                                            start = _serverData.indexOf("<img",start+1);
                                            console.log("<img> find : " + start);
                                            start = _serverData.indexOf("<img",start+1);
                                            console.log("<img> find : " + start);
                                            var img_start = _serverData.indexOf("src", start);
                                            console.log("img start : " + img_start);
                                            var img_end = _serverData.indexOf("\"", img_start+5);
                                            console.log("img end : " + img_end);
                                            var id = _serverData.substring(img_start+5,img_end);

                                            console.log("id1 -> " + id1);
                                            console.log("image link -> " + id);
                                        })
                                    })
                                })
                            })
                            check = blog_data.indexOf("\"link\"",blog_start + 1);
                            console.log(blog_start + " " + check);
                            if(check == -1) break;
                        }
                        res.send(blog_data);
                        console.log("--------------------------------------------------------------");
                        console.log("send data");
                        console.log("--------------------------------------------------------------");
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
                        
                        var start = data.indexOf("item");
                        var end = data.indexOf("item");
                        for(;;){
                            start = data.indexOf("\"link\"",start + 1);
                            if(start == -1) break;
                            end = data.indexOf(",");
                        }
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

