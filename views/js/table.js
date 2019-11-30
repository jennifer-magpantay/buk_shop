//javascript for the table
function draw_table(){
    $("#xmlContent").empty(); //selecting by query table id xmlContent
    $.getJSONuncached = function(url) {
        return $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            success: function(html) {
                $("#xmlContent").append(html); //adding html to the table id xmlContent
            }
        });
    };
    $.getJSONuncached("/get/html")
}
$(document).ready(function(){
    draw_table();
})