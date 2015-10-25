
// Check for updates every 2 seconds
setInterval(function(){
    updateRandoTable();
}, 10000);

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
	var output = "";
	if (messageJson.length == 0 || messageJson.length === undefined)
	{
		output = "<center><p><a href='http://ec2-52-17-7-182.eu-west-1.compute.amazonaws.com/rando/start' target='_blank'>Start</a></p></center>";
	}
	else
	{
		
		output = "<center><table><tr><th>From</th><th>To</th><th>Content</th></tr>";
		
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
			
			// We are on the last message
			if (i == messageJson.length -1 && messageJson[i]['pending'] == true)
			{
				// Finish off table
				output += "</table></center>";
				
				// Add in form
				output += '<form id="randoMessageForm" onsubmit="sendFormMessage(); return false;"><label>From: ' + fromName + '<input type="hidden" value="' + fromName + '" id="fromName"></label><br><label>To: ' + toName + '<input type="hidden" value="' + toName + '" id="toName"></label><br>';
				output += '<label>Content:<input type="text" value="' + messageJson[i]['content'] + ' " id="content"></label><br>';
				output += '<input type="submit" value="Send"></form>';
			}
			else
			{
			
				output += '<tr><td class="message-from">' + fromName + '</td>'
				          + '<td class="message-to">' + toName + '</td>'
				          + '<td class="message-content">' + messageJson[i]['content'] + '</td></tr>';
			}
		} // for
		
	}
	
	$("#rando-messages").html(output);
}

function sendFormMessage()
{
	// Get the numbers
	var toNumber = document.forms["randoMessageForm"]["toName"].value;
	var toFirst = toNumber.indexOf('(') + 1;
	var toLast = toNumber.indexOf(')');
	var toNumber = toNumber.substring(toFirst, toLast);
	var fromNumber = document.forms["randoMessageForm"]["fromName"].value;
	var fromFirst = fromNumber.indexOf('(') + 1;
	var fromLast = fromNumber.indexOf(')');
	var fromNumber = fromNumber.substring(fromFirst, fromLast);
	var content = document.forms["randoMessageForm"]["content"].value;
	
	console.log("Sending message from " + fromNumber + ", to " + toNumber + ", which says - " + content);
	
	var data = { "from": fromNumber, "to": toNumber, "content": content};
	
	$.post('http://ec2-52-17-7-182.eu-west-1.compute.amazonaws.com/rando/send-edit', data);

	// Hide form
	document.forms["randoMessageForm"].hide();
}
 
