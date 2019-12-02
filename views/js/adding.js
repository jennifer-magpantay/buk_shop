function adding(){
    //function to display the hidded form
    var show = document.getElementById('newTitles').style.display;
    
    if(show == "none"){
         //how to override the xml??
         //or you can leave it empty after click
        window.document.getElementById('xmlContent').innerHTML = ""
        document.getElementById('newTitles').style.display = 'block';
    }else{
        document.getElementById('newTitles').style.display = 'none';
        
    }    
}
