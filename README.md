# loopback-example-ssl

An example to demonstrate how to set up SSL for LoopBack applications so that
the REST APIs can be called using https.

## Generate your own SSL certificate

```sh
  cd private
  openssl genrsa -out privatekey.pem 1024
  openssl req -new -key privatekey.pem -out certrequest.csr
  openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
```

## Load the SSL certificate

It's done in ssl-config.js.

```js

    var path = require('path'),
        fs = require("fs");

    exports.privateKey = fs.readFileSync(path.join(__dirname, './private/privatekey.pem')).toString();
    exports.certificate = fs.readFileSync(path.join(__dirname, './private/certificate.pem')).toString();
```

## Create the https server

The code is in app.js.

```js

    var https = require('https');
    var sslConfig = require('./ssl-config');

    ...

    var options = {
      key: sslConfig.privateKey,
      cert: sslConfig.certificate
    };

    return https.createServer(options, app).listen(app.get('port'), function() {
      var baseUrl = 'https://' + app.get('host') + ':' + app.get('port');
      app.emit('started', baseUrl);
      console.log('LoopBack server listening @ %s%s', baseUrl, '/');
    });
```

## Start the application

    node app

## Open the API explorer

[https://localhost:3000/explorer](https://localhost:3000/explorer)

## References

1. [http://nodejs.org/api/https.html](http://nodejs.org/api/https.html)

