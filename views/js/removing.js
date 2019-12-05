function removing(){
    //function to display the hidded form
    var show = document.getElementById('delete_container').style.display;
    
    if(show == "none"){
         //how to override the xml??
         //or you can leave it empty after click
        window.document.getElementById('xmlContent').innerHTML = ""
        document.getElementById('delete_container').style.display = 'block';
    }else{
        document.getElementById('delete_container').style.display = 'none';        
    }

     // Call function to display the list 
    displayAll();
    removing();
}
   

