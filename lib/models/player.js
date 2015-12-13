'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (db, doc, callback) {
  console.log(doc);
  db.collection('players').insertMany(doc).then(function (err, r) {

    console.log("Inserted " + " into the players collection.");
    console.log(r.insertedCount);
    callback(result);
  });
};

var removePlayers = exports.removePlayers = function removePlayers(db, callback) {
  db.collection('players').deleteMany({}, function (err, result) {
    console.log("Deleted All records");
    callback(result);
  });
};

var findPlayers = exports.findPlayers = function findPlayers(db, callback) {
  db.collection('players').find().toArray(function (err, docs) {
    console.log(docs);
    callback(docs);
  });
};

;