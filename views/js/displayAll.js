
function displayAll() {
    //var text = "Complete list of all available titles" 
    //var content = window.document.getElementById('xmlContent')
    //content.innerHTML= text;  
    //onclick function is working but it is not loading the xml doc!!

    //load the xml file
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
    }
    };
  // xmlhttp.open("GET", "docname.xml", true);
  xmlhttp.open("GET", "bookshop", true);
  xmlhttp.send();
}

//my new function where my xml will be read
//my new function where my xml will be read
function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  //adding a variable called table where my results will be printed
  var table="<tr><th>Title</th><th>Year</th><th>Price</th><th>Category</th></tr>";
  var x = xmlDoc.getElementsByTagName("BOOK");
  //for to read all the doc
  for (i = 0; i <x.length; i++) {
    table += "<tr><td>" +
    x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("PRICE")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("CATEGORY")[0].childNodes[0].nodeValue +
    "</td></tr>";
  }
  // document.getElementById("divname").innerHTML = table;
  window.document.getElementById('xmlContent').innerHTML = table;
  //content.innerHTML= table;
}