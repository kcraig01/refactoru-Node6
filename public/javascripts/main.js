$(function(){
	// connect the socket.io server
	var socket = io.connect('http://localhost')

	//define socket events
	socket.on('newchat', function(chatUsers){
		 
		$('#users').empty();
		for (var user in chatUsers)
			console.log(chatUsers[user])
			$('#users').append('<div>'+ chatUsers[user]+'</div>')
	});

	socket.on('message', function(message){
        $('#room').append('<div>'+message+'</div>')
	})

	socket.on('chatover', function(){
		$('#room').append('<div>'+'A user has left the chatroom'+'</div>')
	})
	
	
	// attach events
	$('#message-input').on('keyup', function(e){
		$el = $(this);
		if(e.which === 13){
			console.log('test')
			socket.emit('message', $el.val())
			$el.val('')
		}
	})

	$('#username-input').on('keyup', function(e){
		$el = $(this);
		if(e.which === 13){
			console.log($el.val())
			socket.emit('username', $el.val())
			$el.val('')
		}
	})

});
