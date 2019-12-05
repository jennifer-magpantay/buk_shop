//adding variables to parse the code 
var http = require('http'),
    path = require('path'),
    express = require('express'),
    fs = require('fs'),
    xmlParse = require('xslt-processor').xmlParse,
    xsltProcess = require('xslt-processor').xsltProcess,
    xml2js = require('xml2js'); //jason?

const expAutoSan = require('express-autosanitizer');

    //error: cannot find express - npm install express
    //error: cannot find xslt - npm install xslt-processor
    //install xmlejs - npm install xml2js

//adding variables for the router
/*A Javascript router is a key component in most frontend frameworks. It is the piece of software in charge to 
organize the states of the application, switching between different views. For example, the router will render 
the login screen initially, and when the login is successfull it will perform the transition to the user’s welcome 
screen.*/
var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'views')));

//adding new stuff given by Mikhail
router.use(express.urlencoded({extended: true}));
router.use(express.json());

// Function to read in XML file and convert it to JSON
function xmlFileToJs(filename, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  fs.readFile(filepath, 'utf8', function(err, xmlStr) {
    if (err) throw (err);
    xml2js.parseString(xmlStr, {}, cb);
  });
}

//Function to convert JSON to XML and save it
function jsToXmlFile(filename, obj, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(obj);
  fs.writeFile(filepath, xml, cb);
}

router.get('/', function(req, res){
    res.render('index');
}); //

//function added by Mikhail
router.get('/bookshop', function(req, res){

    res.writeHead(200, {'Content-Type': 'text/xml'});
    var xml = fs.readFileSync('bookshop.xml', 'utf8');
    res.end(xml);

});//

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

//adding more new stuff given by Mikhail
// POST request to add to JSON & XML files
router.post('/post/json', function(req, res) {

  // Function to read in a JSON file, add to it & convert to XML
  function appendJSON(obj) {
    console.log(obj);

    // Function to read in XML file, convert it to JSON, add a new object and write back to XML file
    xmlFileToJs('bookshop.xml', function(err, result) {
      if (err) throw (err);
      //I AM PRETTY SURE THE ERROR IS HERE!!!
      //result.cafemenu.section[obj.sec_n].entree.push({'item': obj.item, 'price': obj.price});
      //result.bookshop.book.push({'title': obj.title, 'year': obj.year, 'price': obj.price, 'category': obj.category});
      result.BOOKSHOP.BOOK.push({'TITLE': obj.TITLE, 'YEAR': obj.YEAR, 'PRICE': obj.PRICE, 'CATEGORY': obj.CATEGORY});
      //result.bookshop.push({'title': obj.title, 'year': obj.year, 'price': obj.price, 'category': obj.sec_n});
      console.log(result);
      jsToXmlFile('bookshop.xml', result, function(err) {
        if (err) console.log(err);
      })
    })
  }; //

  // Call appendJSON function and pass in body of the current POST request
  appendJSON(req.body);

  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');

});

//adding deleting function give by Mikhail
// POST request to add to JSON & XML files
router.post('/post/delete', function(req, res) {

  // Function to read in a JSON file, add to it & convert to XML
  function deleteJSON(obj) {
    // Function to read in XML file, convert it to JSON, delete the required object and write back to XML file
    xmlFileToJs('bookshop.xml', function(err, result) {
      if (err) throw (err);
      //This is where we delete the object based on the position of the section and position of the entree, as being passed on from index.html
      delete result.BOOKSHOP.BOOK[obj.BOOK];
      //delete result.cafemenu.section[obj.section].entree[obj.entree];
      //delete result.XMLDOCNAME.CHILD...

      //This is where we convert from JSON and write back our XML file
      jsToXmlFile('bookshop.xml', result, function(err) {
        if (err) console.log(err);
      })
    })
  }

  // Call appendJSON function and pass in body of the current POST request
  deleteJSON(req.body);

});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});