
'use strict'

var AES, SHA256, SHA512, ENC

var BASE64 = require("crypto-js/enc-base64")
var UTF8 = require("crypto-js/enc-utf8")
var SHA256 = require("crypto-js/hmac-sha256")
var SHA512 = require("crypto-js/hmac-sha512")

const base64url = function (source) {

  var encodedSource = BASE64.stringify(source)
  encodedSource = encodedSource.replace(/=+$/, '')
  encodedSource = encodedSource.replace(/\+/g, '-')
  encodedSource = encodedSource.replace(/\//g, '_')

  return encodedSource;

} 

var header = {
  "alg": "HS256",
  "typ": "JWT"
}

var secret = undefined

exports.init = function (a,s) {

    if(checkAlg){
      header.alg = a
      secret = s
    }
    else {
      console.log('invalid algorithm')
    }

}

exports.encode = function (data,s) {

  try{
 
    if(!!s){
      secret = s
    } else if(!secret){
      console.log('secret key can not be null')
      return
    }

    const stringifiedHeader = UTF8.parse(JSON.stringify(header))
    const encodedHeader = base64url(stringifiedHeader)

    const stringifiedData = UTF8.parse(JSON.stringify(data))
    const encodedData = base64url(stringifiedData)

    const token = encodedHeader + "." + encodedData

    const signature = generateSignature(token, header.alg, secret)
    const encodedSignature = base64url(signature)

    return token + "." + encodedSignature

  } catch(err) {

    console.log(err)

  }

}

const checkAlg = function (alg) {
  var algs = ["HS256","HS512"]
  algs.forEach(function(a) {
    if(a === alg){
      return true
    }
  })
  return false
}

const generateSignature = function (token, alg, secret) {
  switch(alg){
    case "HS256":
      return SHA256(token, secret)
    case "HS512":
      return SHA512(token, secret)
    default:
      console.log("Invalid algo")
      return false
  }
}