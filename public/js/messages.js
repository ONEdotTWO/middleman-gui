
// Check for updates every 2 seconds
setInterval(function(){
    // Get data
    $.getJSON('getMessages.html', function(data) {        
        var output = "";
        
        for (var i = 0; i < data.length; i++)
        {
        	if (data[i]['from'] == "system" || data[i]['from'] == "MiddleMan")
    			{
    					output += '<div class="message-right message" id="1">';
    			}
    			else
    			{
    				output += '<div class="message-left message" id="1">';
    			}
    			output += '<div class="message-from">' + data[i]['from'] + '</div>'
                 + '<div class="message-to">' + data[i]['to'] + '</div>'
                 + '<div class="message-content">' + data[i]['message'] + '</div></div>'
                 + '<div class="clearer"></div>';
    		}
    		
    		$("#messages").html(output);
    	});
}, 2000);
