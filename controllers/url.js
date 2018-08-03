'use strict'
const config = require('../config')
const Url = require('../models/url')
const services = require('../services')

var shortUrl = '';	//this var will content the random short url

/* Get all urls from table - collection */
function getUrls(req, res) {
	Url.find({}, "short prettyUrl original")
		.sort({created_at: -1})
		.exec((err, urls) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					mensaje: "Error getting urls!",
					errors: err
				});
			}
			res.status(200).json({
				ok: true,
				urls: urls
			});

		});
}

/* Get one url and retorn redirect 301 with original url */
function getUrl(req, res) {
	
	let short = req.param('short')
	
	Url.findOne({ short: short })
		.exec((err, url) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					mensaje: "Error getting the url",
					errors: err
				});
			}

			if(!url){
				return res.status(400).json({
					ok: false,
					mensaje: "Url doesn't exist on our BD",		
				});
			}
			// redirect to the original url
			res.redirect(301, url.original)
		});
}

/* Get one url and delete from DB */
function deleteUrl(req, res) {
	
	let id = req.params.id;
	
    Url.findByIdAndRemove(id, (err, urlDeleted) => {

        if (err) {
            return res.status(500).json({mensaje: "Error to delete url"});
        }

        if (!urlDeleted) {
            return res.status(400).json({mensaje: "Url doesnt exist"});
        }


        res.status(200).json({
            ok: true,
            url: urlDeleted
		});
		
    });
}


/* Save a url on urls collection - table */
async function saveUrl(req, res) {

	// init vars
	let originalUrl = req.body.original;	// original url

	// check if url structure is all right
	if (!services.isValidUrl(originalUrl)) {
		res.status(400).send({ message: `Favor ingresar una url válida` })
	}

	// if url structure is fine then generate a short url with async-wait es6
	else {

		let existUrl = await generateUniqueShortUrl();

		if(existUrl){
			return res.status(400).json({ message: `this url is already in use` });
		}

		// Try to find shortUrl on BD
		Url.findOne({ short: shortUrl })
			.exec((err, urlExistDB) => {

				if (err) {
					return res.status(500).json({
						ok: false,
						mensaje: "Error finding url - mongodb",
						errors: err
					});
				}

				if (urlExistDB) {
					return res.status(400).json({
						ok: false,
						mensaje: `Url: ${shortUrl} is already exist on db!`
					});
				} 

				// If code go far to this point is everything is OK, then save url !!!
				let url = new Url({
					short:  `${shortUrl}`,
					prettyUrl: `${config.host}:${config.port}/${shortUrl}`,
					original: originalUrl,
				});
	
				url.save((err, urlSaved) => {

					if (err) {
						return res.status(400).json({
							ok: false,
							mensaje: "something went wrong to create a short url!! :(",
							errors: err
						});
					}

					res.status(200).json({
						ok: true,
						url: urlSaved
					});
				})

			})
	}
}


/* Generate random short string url, and return true if exist ! */
async function generateUniqueShortUrl() {

	// Get random short url generated
	shortUrl = await services.generateShortUrl();

	// Verify url doesn't exist
	var exist = await services.alreadyUsed(shortUrl);

	// return true or false
    return new Promise((resolve) => { resolve(exist) })
}


module.exports = {
	getUrls,
	getUrl,
	saveUrl,
	deleteUrl
}
