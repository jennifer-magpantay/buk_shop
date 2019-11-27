//adding variables to parse the code 
var http = require('http'),
    path = require('path'),
    express = require('express'),
    fs = require('fs'),
    xmlParse = require('xslt-processor').xmlParse,
    xsltProcess = require('xslt-processor').xsltProcess;

    //error: cannot find express - npm install express
    //error: cannot find xslt - npm install xslt-processor

//adding variables for the router
/*A Javascript router is a key component in most frontend frameworks. It is the piece of software in charge to 
organize the states of the application, switching between different views. For example, the router will render 
the login screen initially, and when the login is successfull it will perform the transition to the user’s welcome 
screen.*/
var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'views')));

router.get('/', function(req, res){

    res.render('index');

})

router.get('/get/html', function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'});

    var xml = fs.readFileSync('bookshop.xml', 'utf8');
    var xsl = fs.readFileSync('bookshop.xsl', 'utf8');
    console.log(xml);
    var doc = xmlParse(xml);
    var stylesheet = xmlParse(xsl);

    var result = xsltProcess(doc, stylesheet);

    res.end(result.toString());

});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});