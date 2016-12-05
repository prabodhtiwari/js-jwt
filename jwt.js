
'use strict'

const CryptoJS = require("crypto-js")

const base64url = (source) => {

  let encodedSource = CryptoJS.enc.Base64.stringify(source)
  encodedSource = encodedSource.replace(/=+$/, '')
  encodedSource = encodedSource.replace(/\+/g, '-')
  encodedSource = encodedSource.replace(/\//g, '_')

  return encodedSource;

} 

let header = {
  "alg": "HS256",
  "typ": "JWT"
}

let secret = undefined

exports.init = (a,s) => {

    header.alg = a
    secret = s

}

exports.encode = (data,s) => {

  try{
 
    if(!!s){
      secret = s
    }

    console.log(secret, s)
    if(!secret){
      console.log('secret key can not be null')
      return
    }
    console.log(header)
    const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header))
    const encodedHeader = base64url(stringifiedHeader)

    const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data))
    const encodedData = base64url(stringifiedData)

    const token = `${encodedHeader}.${encodedData}`

    const signature = CryptoJS.HmacSHA512(token, secret)
    const encodedSignature = base64url(signature)

    return `${token}.${encodedSignature}`

  } catch(err) {

    console.log(err)

  }

}