
// Check for updates every 2 seconds
var otherNumbers = [];
var messagesToHide = [];

/*
setInterval(function(){
    updateMessages();
}, 2000);
*/
function updateMessages()
{
	// Get data
	$.getJSON('getMessages.html', function(data) {        
		addMessagesToPage(data);
		
		var optionsOutput = "";
		for (var i = 0; i < otherNumbers.length; i++)
		{
			optionsOutput += '<label><input type="checkbox" name="' + otherNumbers[i] + '" value="' + otherNumbers[i] + '" checked/> ' + otherNumbers[i] + '</label><br>';
		}
		
		$("#message-controls").html(optionsOutput);
		
		if ($(document).scrollTop() == $(document).height())
		{
			$("html, body").animate({ scrollTop: $(document).height() }, "slow");
		}
		
		attachCheckboxHandlers();
	});
};

function attachCheckboxHandlers() {
	// get reference to element containing message checkboxes
	var el = document.getElementById('message-controls');

	// get reference to input elements in message container element
	var numbs = el.getElementsByTagName('input');

	// assign function to onclick property of each checkbox
	for (var i=0, len=numbs.length; i<len; i++)
	{
		if ( numbs[i].type === 'checkbox' ) 
		{
			numbs[i].onclick = function() {
				filterMessages();
			}
		}
	}
}

function addMessagesToPage(messageJson)
{
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
}

function filterMessages()
{
	// get reference to element containing message checkboxes
	var el = document.getElementById('message-controls');

	// get reference to input elements in message container element
	var numbs = el.getElementsByTagName('input');

	// assign function to onclick property of each checkbox
	for (var i=0, len=numbs.length; i<len; i++) 
	{
		if ( numbs[i].type === 'checkbox' ) 
		{
			if (!numbs[i].checked)
			{
				console.log(numbs[i].value + " is checked");
				messagesToHide.push(numbs[i].value);
			}
			else
			{
				var index = messagesToHide.indexOf(numbs[i].value);
				if (index > -1) 
				{
					messagesToHide.splice(index, 1);
				}
			}
		}
	}
	
	$.getJSON('getMessages.html', function(data) {        
		addMessagesToPage(data);
	});
	
};
 
