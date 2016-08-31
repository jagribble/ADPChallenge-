'use strict';
var conn = require('./salesforceconn.js'); // Include our salesforceconn module


module.exports = {
	
	create: function(idea, uni, name1, email1, name2, email2, callback){ //pass registration parameters into create function

		conn.sobject("DHC_Application__c").create( //our salesforce object name
			{ // Create JSON Object
			Idea_name__c : idea,
			Participant_one_name__c: name1,
			Participant_two_name__c: name2,
			Participant_one_email__c: email1,
			Participant_two_email__c: email2,
			University__c: uni
			},

			function(err, ret) { 
			  	if (err || !ret.success) {
			  		return callback(err, null); // Returns the error
			  	}
			  	else
			  	{
			  		return callback(null, ret); // Returns a JSON copy of the object
			  	}
			  	
			}
		);
	}
}
