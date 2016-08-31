'use strict';

    var jsforce = require('jsforce');


    var conn = new jsforce.Connection({
      loginUrl: 'https://login.salesforce.com/'
    });
    // Replace with your own login email + password+key
    conn.login('digitalhealthcare@lilly.com', 'password404JNybQozMV69ZJHOsOUML4fap4', function(err, userInfo) {
      if (err) { return console.log(err); }
        // Now you can get the access token and instance URL information.
        // Save them to establish connection next time.
        console.log(conn.accessToken);
        console.log(conn.instanceUrl);
        // logged in user property
        console.log("User ID: " + userInfo.id);
        console.log("Org ID: " + userInfo.organizationId);
        // .
      });


      module.exports = conn;
