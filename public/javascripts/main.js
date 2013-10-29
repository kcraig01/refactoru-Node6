$(function(){
	// connect the socket.io server
	var socket = io.connect('http://localhost')

	//define socket events
	socket.on('newchat', function(chatUsers){
		$('#room').append('<div>'+'A user has joined the chatroom'+'</div>')
		$('#users').empty();
		for (var user in chatUsers) {
			console.log(chatUsers[user])
			$('#users').append('<div>'+chatUsers[user]+'</div>')
		}
	});

	socket.on('message', function(message){
        $('#room').append('<div>'+message+'</div>')
	});

	socket.on('namechange', function(chatUsers){
		console.log('got to here')
			$('#users').empty();
			for (var user in chatUsers){
				console.log(chatUsers[user])
				$('#users').append('<div>'+chatUsers[user]+'</div>')
			}
	})

	socket.on('chatover', function(chatUsers){
		console.log('someone left')
		$('#room').append('<div>'+'A user has left the chatroom'+'</div>')
		$('#users').empty();
		for (var user in chatUsers){
			console.log(chatUsers[user])
			$('#users').append('<div>'+chatUsers[user]+'</div>')
		}
		});

	
	
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
