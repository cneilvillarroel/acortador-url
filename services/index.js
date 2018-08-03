'use strict'

const validUrl = require('valid-url');
const urlExists = require('url-exists-deep');
const config = require('../config')

/* Verify the url structure */
function isValidUrl(url) {
	if (validUrl.isUri(url)){
        return true;
    } else {
        return false;
    }
}

/* Check if url is already used on internet */
function alreadyUsed(url){
    let full = `${ config.host}:${config.port}/${url}`;
    return new Promise((done) => {
        urlExists(full)
        .then((response) =>{
            if(response.href && response.href != full){
                done(true);
            }else{
                done(false);
            }        
        })
        .catch(() => {
            done(false);
        });
    })
}

/* Generate random short url with only 10 chars */
function generateShortUrl(){
    return new Promise(resolve => {
        let shortUrl = '';
        let alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
        for (let i= 0; i < 5; i++) {
            let random = Math.floor(Math.random() * 58);
            shortUrl+= alphabet.substr(random, 1);
          }
        resolve(shortUrl);
    })
}

module.exports = {
    isValidUrl,
    alreadyUsed,
    generateShortUrl
}
