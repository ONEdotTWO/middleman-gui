
// Check for updates every 2 seconds
setInterval(function(){
    updateRandoTable();
}, 2000);

function updateRandoTable()
{
	// Get data
	$.getJSON('getRando.html', function(data) {        
		
		$.getJSON('getRandoMembers.html', function(members) {
			// Work out if we are at the bottom of the page
			var atBottom = false;
			if ($(window).scrollTop() + $(window).height() == $(document).height())
			{
				atBottom = true;
			}
			
			addRandoTableToPage(data, members);
			
			if (atBottom)
			{
				$("html, body").animate({ scrollTop: $(document).height() }, "slow");
			}
		});
	});
};

function addRandoTableToPage(messageJson, membersJson)
{
	var output = "<center><table><tr><th>From</th><th>To</th><th>Content</th></tr>";
	
	for (var i = 0; i < messageJson.length; i++)
	{
		var fromName = messageJson[i]['from'];
		var toName = messageJson[i]['to'];
		
		for (var j = 0; j < membersJson.length; j++)
		{
			if (membersJson[j]['number'] == fromName)
			{
				fromName = membersJson[j]['name'] + " (" + fromName + ")";
				break;
			}
		}
		for (var j = 0; j < membersJson.length; j++)
		{
			if (membersJson[j]['number'] == toName)
			{
				toName = membersJson[j]['name'] + " (" + toName + ")";
				break;
			}
		}
		
		output += '<tr><td class="message-from">' + fromName + '</td>'
		          + '<td class="message-to">' + toName + '</td>'
		          + '<td class="message-content">' + messageJson[i]['content'] + '</td></tr>';
	} // for
	
	output += "</table></center>";
	
	$("#rando-messages").html(output);
}
 
