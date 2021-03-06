'use strict';

var _player = require('./models/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/cricket';

/**
 * Mongo Connect
 * @param  {[type]} err [description]
 * @param  {[type]} db) {             if (err) {    throw err;  }  db.collection('players').find().toArray(function(err, result) {    if (err) {      throw err;    }    console.log(result);  });} [description]
 * @return {[type]}     [description]
 */
MongoClient.connect(url, function (err, db) {
    if (err) {
        throw err;
    }

    // removePlayers(db,function(){
    //     db.close();
    // });;

    (0, _player.findPlayers)(db, function () {
        db.close();
    });
});

/**
 * URL /
 * @param  {[type]} req       [description]
 * @param  {String} res){var siteDomain    [description]
 * @return {[type]}           [description]
 */
app.get('/', function (req, res) {

    var siteDomain = 'http://www.cricketweb.net';
    var playersUrl = '/statsspider/main/';

    MongoClient.connect(url, function (err, db) {

        var pages = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

        pages.forEach(function (i) {

            request(siteDomain + playersUrl + i + '.php', function (error, response, html) {
                if (!error) {
                    var $ = cheerio.load(html);

                    var json = { name: "", link: "" };
                    var players = $('.general_table a').map(function (i, el) {
                        console.log($(this).text());
                        return {
                            name: $(this).text(),
                            link: siteDomain + $(this).attr('href')
                        };
                    }).get();
                    (0, _player2.default)(db, players, function () {
                        db.close();
                    });
                }
            });
        });
    });
});

app.listen('8081');
console.log('Magic happens on port 8081');
exports = module.exports = app;