
'use strict';

var CryptoJS = require("crypto-js");

var base64url = function base64url(source) {

  var encodedSource = CryptoJS.enc.Base64.stringify(source);
  encodedSource = encodedSource.replace(/=+$/, '');
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');

  return encodedSource;
};

var header = {
  "alg": "HS256",
  "typ": "JWT"
};

var secret = undefined;

exports.init = function (a, s) {

  if (checkAlg) {
    header.alg = a;
    secret = s;
  } else {
    console.log('invalid algorithm');
  }
};

exports.encode = function (data, s) {

  try {

    if (!!s) {
      secret = s;
    } else if (!secret) {
      console.log('secret key can not be null');
      return;
    }

    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    var encodedHeader = base64url(stringifiedHeader);

    var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
    var encodedData = base64url(stringifiedData);

    var token = encodedHeader + "." + encodedData;

    var signature = generateSignature(token, header.alg, secret);
    var encodedSignature = base64url(signature);

    return token + "." + encodedSignature;
  } catch (err) {

    console.log(err);
  }
};

var checkAlg = function checkAlg(alg) {
  var algs = ["HS256", "HS512"];
  algs.forEach(function (a) {
    if (a === alg) {
      return true;
    }
  });
  return false;
};

var generateSignature = function generateSignature(token, alg, secret) {
  switch (alg) {
    case "HS256":
      return CryptoJS.HmacSHA256(token, secret);
    case "HS512":
      return CryptoJS.HmacSHA512(token, secret);
    default:
      console.log("Invalid algo");
      return false;
  }
};

