
// Check for updates every 2 seconds
/*setInterval(function(){
    updateRandoTable();
}, 2000);
*/
function updateRandoTable()
{
	// Get data
	$.getJSON('getRando.html', function(data) {        
		
		// Work out if we are at the bottom of the page
		var atBottom = false;
		if ($(window).scrollTop() + $(window).height() == $(document).height())
		{
			atBottom = true;
		}
		
		addRandoTableToPage(data);
		
		if (atBottom)
		{
			$("html, body").animate({ scrollTop: $(document).height() }, "slow");
		}
	});
};

function addRandoTableToPage(messageJson)
{
	var output = "<center><table><tr><th>From</th><th>To</th><th>Content</th></tr>";
	
	for (var i = 0; i < messageJson.length; i++)
	{
		output += '<tr><td class="message-from">' + messageJson[i]['from'] + '</td>'
		          + '<td class="message-to">' + messageJson[i]['to'] + '</td>'
		          + '<td class="message-content">' + messageJson[i]['content'] + '</td></tr>';
	} // for
	
	output += "</table></center>";
	
	$("#rando-messages").html(output);
}
 
