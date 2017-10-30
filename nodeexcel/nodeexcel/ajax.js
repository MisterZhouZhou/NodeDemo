/**
 * 功能：本文件主要实现了nodejs版本的$.ajax方法，使用基本和jQuery.ajax相同
 * 时间：2012-07-17
 * 作者：潘雪鹏
 */

var https = require("https");
var http = require("http");
var Url = require("url");
var querystring = require('querystring');

// 默认值
var defaultSetting = {
    // 如果返回false可以取消本次请求
    beforeSend: function (req) {
    },
    complete: function (req) {
    },
    data: '', // Object, String
    dataType: 'JSON',
    error: function () {
    },
    headers: {}, // {k:v, ...}
    statusCode: {},
    success: function (data) {
    },
    timeout: 10,
    type: 'GET', // GET, POST
    url: "www.baidu.com"
};

/**
 *
 */
function ajax(settings) {
    // ajaxlbs.js(settings)
    if (typeof settings === "object") {
        // 处理默认值继承
        // todo ...
        for (key in defaultSetting) {
            if (settings[key] == null) {
                settings[key] = defaultSetting[key];
            }
        }
    }

    var params = Url.parse(settings.url, true);
    // params 解析出来的参数如下
    // {
    // "protocol":"http:",
    // "slashes":true,
    // "host":"localhost:3000",
    // "port":"3000",
    // "hostname":"localhost",
    // "href":"http://localhost:3000/?d=1",
    // "search":"?d=1",
    // "query":{"d":"1"},
    // "pathname":"/",
    // "path":"/?d=1"
    // }

    var options = {
        host: params.hostname,
        port: params.port || 80,
        path: params.path,
        method: settings.type
    };

    if (settings.data != null) {
        options.path += "?"
        for (var key in settings.data) {
            options.path = options.path + "&" + key + "=" + settings.data[key];
        }
        console.log(options.path);
    }

    var httpUnity = http;
    if (params.protocol == "https:") {
        options.port = 443;
        var httpUnity = https;
    }

    var req = httpUnity.request(options,function (res) {
        var data = '';
        res.on('data',function (chunk) {
            data += chunk;
        }).on('end', function () {
                if (settings.dataType === "json") {
                    try {
                        data = JSON.parse(data);
                    } catch (e) {
                        data = null;
                    }
                }
                settings.success(data);
                settings.complete(req);
            });
    }).on('error', function (e) {
            settings.error(e);
        });

//    if (typeof settings.beforeSend === "function") {
//        if (!settings.beforeSend(req)) {
//            settings.complete(req);
//            req.end();
//            return false;
//        }
//    }

    if (settings.type === "POST") {
        var dataStr = querystring.stringify(settings.data);
        req.setHeader("Content-Length", dataStr.length);
        req.write(dataStr);
    }

    req.setTimeout(settings.timeout);
    req.end();
}

exports.ajax = ajax;