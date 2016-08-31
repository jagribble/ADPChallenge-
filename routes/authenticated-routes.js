// Routes in this module require authentication
var express = require('express');
var router = express.Router();
var registration = require('../controllers/registration.js');
var AUTH_REQUIRED = (process.env.AUTH_REQUIRED == 'true'); // Controls whether this web app will require authentication and authorization.
var ContentfulKey = process.env.CONTENTFUL_KEY;
var ContentfulSpace = process.env.CONTENTFUL_SPACE;
//include bodyparser middleware so we can parse our POST queries for adding a new application to salesforce
var bodyParser = require('body-parser');

var contentfulAPI = require('../controllers/contentful.js');

router.use(bodyParser.json());

// middleware that is specific to this router
router.use(function authorized(req, res, next) {
  if (req.isAuthenticated() || !AUTH_REQUIRED) {
  	return next();
  }
  	res.redirect('/auth/forcedotcom?redirect='+req.originalUrl);
});

router.get('/test1', function(req, res) {
	contentfulAPI.getContent('header').then(function(response){
		res.render('roletemplate',{
			header:response
		});
	});
});

router.get('/', function(req, res) {

	Promise.all([contentfulAPI.getContent('header'),contentfulAPI.getContent('studentExperience'),contentfulAPI.getContent('faq'),
				contentfulAPI.getContent('saDesc'),contentfulAPI.getContent('devDesc'),contentfulAPI.getContent('baDesc'),
				contentfulAPI.getContent('devTimeline'),contentfulAPI.getContent('saBaTimeline')]).then(function(response){
					res.render('roletemplate',{
						header:response[0],
						studentExperienceList:response[1],
						faq:response[2],
						saDesc:response[3],
						devDesc:response[4],
						baDesc:response[5],
						devTimeline:response[6],
						saBaTimeline:response[7]
					});
				});
});

function htmlExt(route) {
  	return '/' + route + '|' + route + '.html';
}

router.get('/about', function(req, res) {
	return res.render('about');
});



router.post('/create', function(req, res) {
	//create parameters are: idea*, uni*, applicant 1 name*, applicant 1 email*, applicant 2 name, applicant 2 email
	registration.create(req.body.idea, req.body.uni, req.body.name1, req.body.email1, req.body.name2, req.body.email2, function(err, ret) { //create a sf object with parameters from AJAX request (see create.handlebars)
		if(err) { //if registration returns an error, send this error to what requested the POST
				res.json(err);
				console.log(err);
		} else {
			res.cookie('hackRegistered', 'true', {expires: new Date('2018-01-01')});
			if(!req.body.name2) {
				res.cookie('hackName', req.body.name1, {expires: new Date('2018-01-01')});
				res.cookie('hackUni', req.body.uni, {expires: new Date('2018-01-01')});
				res.json('success');
			}
			else {
				res.cookie('hackName', req.body.name1 + ' and ' + req.body.name2, {expires: new Date('2018-01-01')});
				res.cookie('hackUni', req.body.uni, {expires: new Date('2018-01-01')});
				res.json('success');
			}
		}
	});

});

module.exports = router;
