
'use strict'

const CryptoJS = require("crypto-js")

const base64url = function (source) {

  var encodedSource = CryptoJS.enc.Base64.stringify(source)
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

    const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header))
    const encodedHeader = base64url(stringifiedHeader)

    const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data))
    const encodedData = base64url(stringifiedData)

    const token = `${encodedHeader}.${encodedData}`

    const signature = generateSignature(token, header.alg, secret)
    const encodedSignature = base64url(signature)

    return `${token}.${encodedSignature}`

  } catch(err) {

    console.log(err)

  }

}

const checkAlg = function (alg) {
  var algs = ["HS256","HS512"]
  algs.forEach(a => {
    if(a === alg){
      return true
    }
  })
  return false
}

const generateSignature = function (token, alg, secret) {
  switch(alg){
    case "HS256":
      return CryptoJS.HmacSHA256(token, secret)
    case "HS512":
      return CryptoJS.HmacSHA512(token, secret)
    default:
      console.log("Invalid algo")
      return false
  }
}