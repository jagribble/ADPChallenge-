var contentful = require('contentful');


var contentfulClientConfig = {
     accessToken: process.env.CONTENTFUL_KEY,
    space: process.env.CONTENTFUL_SPACE,
     insecure: false
};


if (process.env.ON_LOCAL_NETWORK == 'true') {
    console.log('proxy required');
    var HttpProxyAgent = require('https-proxy-agent');
    var proxy = 'http://proxy.gtm.lilly.com:9000';         
    var proxyAgent = new HttpProxyAgent(proxy);
    contentfulClientConfig.agent = proxyAgent;
}

var client = contentful.createClient(contentfulClientConfig);


module.exports = {

    getContent: function(contentType) {
           return new Promise((resolve) =>{
            //get all entries from contentful with the content type of the parameter
            client.getEntries({
                'include':3,
                'content_type' : contentType
            }).then(function(entries){
                console.log('Getting content from contentful');
                //return the entries
                resolve(entries);
            })



        })


    }

}
