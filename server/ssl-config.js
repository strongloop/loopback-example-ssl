// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-example-ssl
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var path = require('path');
var fs = require('fs');

exports.privateKey = fs.readFileSync(path.join(__dirname, './private/privatekey.pem')).toString();
exports.certificate = fs.readFileSync(path.join(__dirname, './private/certificate.pem')).toString();
