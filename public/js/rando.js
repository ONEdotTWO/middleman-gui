
// Check for updates every 2 seconds
setInterval(function(){
    updateRandoTable();
}, 2000);

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
	console.log("got " + messageJson.length + " messages");
/*
	var output = "";
	
	for (var i = 0; i < messageJson.length; i++)
	{
		if (messageJson[i]['original'] == "true" && messageJson[i]['plugin'] == ['middleman'])
		{
			if (messagesToHide.indexOf(messageJson[i]['from']) == -1)
			{
				if (messageJson[i]['from'] == "system" || messageJson[i]['from'] == "MiddleMan" || messageJson[i]['from'] == '447860033664'
				    || messageJson[i]['from'] == '447817933037')
				{
					output += '<div class="message-right message" id="1">';
				}
				else
				{
					output += '<div class="message-left message" id="1">';
					if (otherNumbers.indexOf(messageJson[i]['from']) == -1)
					{
						otherNumbers.push(messageJson[i]['from']);
					}
				}
				output += '<div class="message-from">' + messageJson[i]['from'] + '</div>'
				          + '<div class="message-to">' + messageJson[i]['to'] + '</div>'
				          + '<div class="message-content">' + messageJson[i]['message'] + '</div></div>'
				          + '<div class="clearer"></div>';
			} // if not hidden
		} // if original
	} // for
	
	$("#messages").html(output);
	*/
}
 
