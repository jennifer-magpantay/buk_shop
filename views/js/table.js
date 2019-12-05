//javascript for the table
function draw_table(){
    $("#xmlContent").empty(); //selecting by query table id xmlContent
    $.getJSONuncached = function(url) {
        return $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            success: function(html) {
                $("#xmlContent").append(html);
                select_row(); //adding html to the table id xmlContent
            }
        });
    };
    $.getJSONuncached("/get/html")
};

//adding code given by Mikhail to select row and delete it
function select_row()
{
	$("#bookshoptable tbody tr[id]").click(function ()//
	{
		//$(".selected").removeClass("selected");//where is that selected class???
        //$(this).addClass("selected");
        $(".selected").removeClass("selected");//it is on CSS file
		$(this).addClass("selected");
        var BOOK = $(this).prevAll("tr").children("td[colspan='4']").length - 1;
        console.log(BOOK);
		//var XX = $(this).attr("id") - 1;
		delete_row(BOOK);
	})
};

function delete_row(BOOK)
{
	$("#delete").click(function () {
		$.ajax(
		{
			url: "/post/delete",
			type: "POST",
			data:
			{
				BOOK: BOOK
			},
			cache: false,
			success: setTimeout(draw_table, 1000)
		})
	})
};

$(document).ready(function ()
{
	draw_table();
});