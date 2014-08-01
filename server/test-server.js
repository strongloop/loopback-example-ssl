/**
 * Run `node import.js` to import the test data into the db.
 */
var async = require('async');
var app = require('./server');
var db = app.dataSources.db;

var notes = [
];

for(var i=0; i<500; i++) {
  notes.push({author: 'Author' + i, title: 'Blog ' + i, content: 'Nice content ' + i, created: new Date(), modified: new Date()});
}

function importData(Model, data, cb) {

  // console.log('Importing data for ' + Model.modelName);
  Model.destroyAll(function (err) {
    if(err) {
      cb(err);
      return;
    }
    async.each(data, function (d, callback) {
      Model.create(d, callback);
    }, cb);
  });
}

async.series(
  [
    function (cb) {
      db.autoupdate(cb);
    },
    importData.bind(null, app.models.note, notes)
  ], function (err, results) {
    if(err) {
      console.error(err);
    } else {
      console.log('Done');
    }
  });

app.start();


