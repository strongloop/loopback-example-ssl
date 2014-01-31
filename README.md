loopback-example-ssl
====================

An example to demonstrate how to set up SSL for LoopBack applications

## Generate your own SSL certificate

```sh
  cd private
  openssl genrsa -out privatekey.pem 1024
  openssl req -new -key privatekey.pem -out certrequest.csr
  openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
```
## Start the application

  node app

https://localhost:3000/explorer


